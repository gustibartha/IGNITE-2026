import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { EditForm } from "./edit-form";

export default async function EditIdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const idea = await db.query.ideas.findFirst({
    where: eq(ideas.id, resolvedParams.id),
  });

  if (!idea) {
    notFound();
  }

  return <EditForm idea={idea} />;
}
