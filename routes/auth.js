const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ error: 'User creation failed' });
      }
      res.json({ message: 'User created successfully' });
    });
  } catch (err) {
    console.error('Hashing error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Login failed' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  });
});

module.exports = router;
