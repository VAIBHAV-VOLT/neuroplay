const db = require('./db');

db.query(
  "ALTER TABLE metrics ADD COLUMN backspace_count INT DEFAULT 0, ADD COLUMN pause_time FLOAT DEFAULT 0;", 
  (err, res) => {
    if(err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('Columns already exist.');
      } else {
        console.error('Error adding columns:', err);
      }
    } else {
      console.log('Columns backspace_count and pause_time added successfully');
    }
    process.exit(0);
  }
);
