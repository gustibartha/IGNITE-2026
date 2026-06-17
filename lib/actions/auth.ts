"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function login(email: string) {
  try {
    // In this simple version, we just check if the email exists.
    // For production, you should use Better Auth or similar with password hashing.
    let user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    // Automatically register the user if they don't exist (since this is an internal app)
    if (!user) {
      const [newUser] = await db.insert(users).values({
        name: email.split("@")[0],
        email: email,
      }).returning();
      user = newUser;
    }

    // Set a simple cookie as a session
    (await cookies()).set("session_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Terjadi kesalahan sistem." };
  }
}

export async function logout() {
  (await cookies()).delete("session_id");
  return { success: true };
}

export async function getSession() {
  const sessionId = (await cookies()).get("session_id")?.value;
  if (!sessionId) return null;

  const user = await db.query.users.findFirst({
    where: eq(users.id, sessionId),
  });

  return user || null;
}
