const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // Your DB username
  password: 'gehu@123',   // Your DB password
  database: 'eco_hub'     // Your DB name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);  // Exit if connection fails
  } else {
    console.log('Successfully connected to MySQL database!');
  }
  
  // Close connection after test
  db.end();
});
