// eco-backend/controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register
exports.registerUser = async (req, res) => {
  const { username, pinNumber, password } = req.body;
  try {
    // Check if user exists
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      'INSERT INTO users (username, pinnumber, password) VALUES (?, ?, ?)',
      [username, pinNumber, hashedPassword]
    );

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 2. Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = rows[0];
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Optional: Generate JWT
    const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
      token: token  // only if using JWT
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 3. Forgot Password
exports.forgotPassword = async (req, res) => {
  const { username, pinNumber, newPassword} = req.body;
  try {
    // Find user
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = rows[0];

    // Check pin
    if (user.pinnumber !== pinNumber) {
      return res.status(400).json({ message: 'Invalid PIN' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, user.id]);

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
