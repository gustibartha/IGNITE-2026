"use server";

import { db } from "@/lib/db";
import { ideas, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/actions/auth";
import { supabase } from "@/lib/supabase";

export async function createIdea(formData: FormData) {
  try {
    // Since the system is now open for internal use without login, we bypass the session check.
    // We will use a default "Anonymous" user or create one if it doesn't exist to satisfy the foreign key constraint.
    let defaultUser = await db.query.users.findFirst({
      where: eq(users.email, "anonymous@ignite2026.internal"),
    });

    if (!defaultUser) {
      const [newUser] = await db.insert(users).values({
        name: "Anonymous User",
        email: "anonymous@ignite2026.internal",
      }).returning();
      defaultUser = newUser;
    }
    const userId = defaultUser.id;

    const uploadFileToSupabase = async (file: File | null, bucket: string) => {
      if (!file || file.size === 0) return null;
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, buffer, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error(`Error uploading to ${bucket}:`, error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    };

    // Extract basic fields
    const data = {
      nid: formData.get("nid") as string,
      nama: formData.get("nama") as string,
      bidang: formData.get("bidang") as string,
      subBidang: formData.get("subBidang") as string,
      jumlahAnggota: parseInt(formData.get("jumlahAnggota") as string),
      kategoriBidangInovasi: formData.get("kategoriBidangInovasi") as string,
      judul: formData.get("judul") as string,
      kategoriInovasi: formData.get("kategoriInovasi") as string,
      latarBelakang: formData.get("latarBelakang") as string,
      implementasi: formData.get("implementasi") as string,
      manfaat: formData.get("manfaat") as string,
      peluangDiseminasi: formData.get("peluangDiseminasi") as string,
    };

    // Handle files via Supabase Storage
    // Assuming buckets 'analisa-resiko', 'foto-inovasi', 'ecp' exist in Supabase
    const resikoFile = formData.get("resiko") as File;
    const fotoFile = formData.get("foto") as File;
    const ecpFile = formData.get("ecp") as File;

    const resikoUrl = await uploadFileToSupabase(resikoFile, "analisa-resiko");
    const fotoUrl = await uploadFileToSupabase(fotoFile, "foto-inovasi");
    const ecpUrl = await uploadFileToSupabase(ecpFile, "ecp");

    await db.insert(ideas).values({
      ...data,
      analisaResiko: resikoUrl,
      fotoInovasi: fotoUrl,
      ecp: ecpUrl,
      userId,
      status: "Submitted",
    });

    revalidatePath("/");
    revalidatePath("/board");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create idea:", error);
    return { success: false, error: `Error: ${error.message || error.toString()}` };
  }
}
