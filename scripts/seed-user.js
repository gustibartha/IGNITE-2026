const Database = require("better-sqlite3");
const db = new Database("sqlite.db");

try {
  console.log("Seeding placeholder user...");
  db.prepare(`
    INSERT OR IGNORE INTO users (id, name, email, created_at)
    VALUES ('placeholder_user_id', 'Admin Ignite', 'admin@upmuarakarang.com', ?)
  `).run(Date.now());
  
  console.log("Seeding successful.");
} catch (error) {
  console.error("Seeding failed:", error);
} finally {
  db.close();
}
