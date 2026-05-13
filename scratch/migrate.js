const Database = require('better-sqlite3');
const db = new Database('sqlite.db');

try {
  db.prepare("ALTER TABLE ideas ADD COLUMN sub_bidang TEXT").run();
  console.log("Column 'sub_bidang' added successfully!");
} catch (err) {
  if (err.message.includes("duplicate column name")) {
    console.log("Column 'sub_bidang' already exists.");
  } else {
    console.error("Error adding column:", err.message);
  }
} finally {
  db.close();
}
