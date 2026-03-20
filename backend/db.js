const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'neuro',
  password: 'neuroplay1234',
  database: 'neuroplay'
});

db.connect((err) => {
  if (err) {
    console.log('DB connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;