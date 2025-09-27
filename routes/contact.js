const express = require('express');
const router = express.Router();
const db = require('../db');

// Contact form submission
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error('Error saving contact:', err);
      return res.status(500).json({ error: 'Failed to save contact message' });
    }
    res.json({ message: 'Thank you for contacting us!' });
  });
});

module.exports = router;
