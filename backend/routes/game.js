const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticate = require('../middleware/authMiddleware');

router.post('/submit-data', authenticate, (req, res) => {
  const { 
    game_type, score, typing_speed, error_rate, 
    reaction_time, focus_score, backspace_count, pause_time,
    pattern_accuracy, pattern_time, pattern_mistakes,
    wrong_time, missed_targets, consistency_score,
    mood_type, mood_intensity, mood_response_time
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
        (session_id, typing_speed, error_rate, reaction_time, focus_score, backspace_count, pause_time,
         pattern_accuracy, pattern_time, pattern_mistakes,
         wrong_time, missed_targets, consistency_score,
         mood_type, mood_intensity, mood_response_time) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sessionId, 
          typing_speed || 0, 
          error_rate || 0, 
          reaction_time || 0, 
          focus_score || 0, 
          backspace_count || 0, 
          pause_time || 0,
          pattern_accuracy || 0,
          pattern_time || 0,
          pattern_mistakes || 0,
          wrong_time || 0,
          missed_targets || 0,
          consistency_score || 0,
          mood_type || 'Neutral',
          mood_intensity || 0,
          mood_response_time || 0
        ],
        (err2, result2) => {
          if (err2) return res.status(500).send(err2);

          res.send('Game data saved successfully');
        }
      );
    }
  );
});

module.exports = router;