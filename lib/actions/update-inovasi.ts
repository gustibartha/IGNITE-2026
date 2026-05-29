"use server";

import { db } from "@/lib/db";
import { ideas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";

export async function updateIdea(id: string, formData: FormData) {
  try {
    const uploadFileToSupabase = async (file: File | null, bucket: string) => {
      if (!file || file.size === 0) return null;
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `updates/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error(`Error uploading to ${bucket}:`, error);
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    };

    const data: any = {
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

    const resikoFile = formData.get("resiko") as File | null;
    const fotoFile = formData.get("foto") as File | null;
    const ecpFile = formData.get("ecp") as File | null;

    if (resikoFile && resikoFile.size > 0) {
      data.analisaResiko = await uploadFileToSupabase(resikoFile, "analisa-resiko");
    }
    if (fotoFile && fotoFile.size > 0) {
      data.fotoInovasi = await uploadFileToSupabase(fotoFile, "foto-inovasi");
    }
    if (ecpFile && ecpFile.size > 0) {
      data.ecp = await uploadFileToSupabase(ecpFile, "ecp");
    }

    await db.update(ideas)
      .set(data)
      .where(eq(ideas.id, id));

    revalidatePath("/");
    revalidatePath("/board");
    revalidatePath(`/board/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update idea:", error);
    return { success: false, error: "Gagal menyimpan perubahan ide inovasi." };
  }
}
