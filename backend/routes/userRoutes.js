const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Register user and address
router.post('/register', (req, res) => {
    const { name, address } = req.body;
    const userQuery = 'INSERT INTO User (name) VALUES (?)';
    const addressQuery = 'INSERT INTO Address (address, userId) VALUES (?, ?)';

    db.query(userQuery, [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = result.insertId;
        db.query(addressQuery, [address, userId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User and address added' });
        });
    });
});

// Get users with addresses
router.get('/users', (req, res) => {
    const query = `
      SELECT User.id, User.name, Address.address 
      FROM User 
      JOIN Address ON User.id = Address.userId;
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

module.exports = router;
