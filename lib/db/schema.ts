import { pgTable, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const ideas = pgTable("ideas", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().references(() => users.id),
  nid: text("nid").notNull(),
  nama: text("nama").notNull(),
  bidang: text("bidang").notNull(),
  subBidang: text("sub_bidang"),
  jumlahAnggota: integer("jumlah_anggota").notNull(),
  kategoriBidangInovasi: text("kategori_bidang_inovasi").notNull(),
  judul: text("judul").notNull(),
  kategoriInovasi: text("kategori_inovasi").notNull(),
  latarBelakang: text("latar_belakang").notNull(),
  implementasi: text("implementasi").notNull(),
  manfaat: text("manfaat").notNull(),
  peluangDiseminasi: text("peluang_diseminasi").notNull(),
  analisaResiko: text("analisa_resiko"),
  fotoInovasi: text("foto_inovasi"),
  ecp: text("ecp"),
  status: text("status").notNull().default("Submitted"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
