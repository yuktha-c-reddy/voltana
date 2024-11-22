
const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const router = express.Router();
const JWT_KEY = 'MYSECRETKEY';


router.post(
  '/signup',
  [
    body('name').isLength({ min: 3 }).withMessage('Name too short'),
    body('email').isEmail().withMessage('Enter valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password is too short'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await userModel.createUser(name, email, hashedPassword);
      const token = jwt.sign({ userId: user.id }, JWT_KEY);

      res.status(201).json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
);


router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password cannot be blank'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const users = await userModel.getAllUsers();
      const user = users.find((user) => user.email === email);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Incorrect password' });
      }

      const token = jwt.sign({ userId: user.id }, JWT_KEY);
      res.json({
        success: true,
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  }
);

// Update user details
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    const updatedUser = await userModel.updateUser(id, name, email, role);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(id);
    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.get('/tables', async (req, res) => {
  console.log('Incoming request for /api/tables');
  try {
    const result = await userModel.getAllUsers();
    console.log('Query result:', result);
    res.json(result);
  } catch (err) {
    console.error('Error fetching tables:', err);
    res.status(500).send('Error fetching table names');
  }
});



module.exports = router;
