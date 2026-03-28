const db = require('./db');

const alterQuery = `
  ALTER TABLE metrics 
  ADD COLUMN pattern_accuracy FLOAT DEFAULT 0,
  ADD COLUMN pattern_time FLOAT DEFAULT 0,
  ADD COLUMN pattern_mistakes INT DEFAULT 0,
  ADD COLUMN wrong_time FLOAT DEFAULT 0,
  ADD COLUMN missed_targets INT DEFAULT 0,
  ADD COLUMN consistency_score FLOAT DEFAULT 0,
  ADD COLUMN mood_type VARCHAR(50) DEFAULT 'Neutral',
  ADD COLUMN mood_intensity INT DEFAULT 0,
  ADD COLUMN mood_response_time FLOAT DEFAULT 0;
`;

db.query(alterQuery, (err, res) => {
  if (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Columns already exist.');
    } else {
      console.error('Error adding columns:', err);
    }
  } else {
    console.log('9 Custom Metrics columns added successfully');
  }
  process.exit(0);
});
