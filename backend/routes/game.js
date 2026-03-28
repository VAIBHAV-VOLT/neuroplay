const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authMiddleware');

router.post('/submit-data', authenticate, (req, res) => {
  const { 
    game_type, score, typing_speed, error_rate, 
    reaction_time, focus_score, backspace_count, pause_time 
  } = req.body;

  // Step 1: Insert into game_sessions
  db.query(
    'INSERT INTO game_sessions (user_id, game_type, score) VALUES (?, ?, ?)',
    [req.user.id, game_type, score],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const sessionId = result.insertId;

      // Step 2: Insert into metrics
      db.query(
        `INSERT INTO metrics 
        (session_id, typing_speed, error_rate, reaction_time, focus_score, backspace_count, pause_time) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [sessionId, typing_speed, error_rate, reaction_time, focus_score, backspace_count || 0, pause_time || 0],
        (err2, result2) => {
          if (err2) return res.status(500).send(err2);

          res.send('Game data saved successfully');
        }
      );
    }
  );
});

module.exports = router;