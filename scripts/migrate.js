const Database = require("better-sqlite3");
const db = new Database("sqlite.db");

try {
  console.log("Dropping old tables if exist...");
  db.prepare("DROP TABLE IF EXISTS inovasi").run();
  db.prepare("DROP TABLE IF EXISTS ideas").run();
  
  console.log("Creating users table...");
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL
    )
  `).run();

  console.log("Creating ideas table...");
  db.prepare(`
    CREATE TABLE IF NOT EXISTS ideas (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      nid TEXT NOT NULL,
      nama TEXT NOT NULL,
      bidang TEXT NOT NULL,
      jumlah_anggota INTEGER NOT NULL,
      kategori_bidang_inovasi TEXT NOT NULL,
      judul TEXT NOT NULL,
      kategori_inovasi TEXT NOT NULL,
      latar_belakang TEXT NOT NULL,
      implementasi TEXT NOT NULL,
      manfaat TEXT NOT NULL,
      peluang_diseminasi TEXT NOT NULL,
      analisa_resiko TEXT,
      foto_inovasi TEXT,
      ecp TEXT,
      status TEXT NOT NULL DEFAULT 'Submitted',
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `).run();

  console.log("Database schema updated successfully.");
} catch (error) {
  console.error("Migration failed:", error);
} finally {
  db.close();
}
