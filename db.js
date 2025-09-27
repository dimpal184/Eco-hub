const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',             // ✅ provide correct username
  password: 'gehu@123',     // ✅ your actual password
  database: 'eco_hub'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

module.exports = db;
