
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
  const { name, email, role, password } = req.body;

  try {
    // Retrieve the existing user from the database
    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update only fields provided in the request
    const updatedUser = await userModel.updateUser(
      id,
      name || existingUser.name,
      email || existingUser.email,
      role || existingUser.role,
      password || existingUser.password
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
});


router.delete('/delete/:id', async (req, res) => {
  
  const { id } = req.params;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    
    const decoded = jwt.verify(token, JWT_KEY);
    console.log(decoded.userId);
    if (decoded.userId !== parseInt(id, 10)) {
      
      return res.status(403).json({ error: 'You can only delete your own account' });
    }
    console.log("route correct");
    await userModel.deleteUser(id); 
    res.status(204).send();
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
