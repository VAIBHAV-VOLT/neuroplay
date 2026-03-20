const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authMiddleware');

router.post('/submit-data', authenticate, (req, res) => {
  const { typing_speed, error_rate, reaction_time, accuracy, mood } = req.body;

  db.query(
    `INSERT INTO sessions 
    (user_id, typing_speed, error_rate, reaction_time, accuracy, mood) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [req.user.id, typing_speed, error_rate, reaction_time, accuracy, mood],
    (err, result) => {
      if (err) return res.status(500).send(err);

      res.send('Data saved successfully');
    }
  );
});

module.exports = router;