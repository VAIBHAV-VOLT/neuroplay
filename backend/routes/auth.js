const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// 🔹 STEP 6: SIGNUP
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('Email already exists');
          }
          return res.status(500).send(err);
        }

        res.send('User registered successfully');
      }
    );

  } catch (error) {
    res.status(500).send(error);
  }
});


// 🔹 STEP 7: LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).send(err);

      if (results.length === 0) {
        return res.status(400).send('User not found');
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, 'secretkey');

      res.json({ token });
    }
  );
});

module.exports = router;