// eco-backend/controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register
exports.registerUser = async (req, res) => {
  const { username, pinNumber, password } = req.body;
  try {
    // Check if user exists
    const [existing] = await db.query('SELECT * FROM ecousers WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      'INSERT INTO ecousers (username, pinnumber, password) VALUES (?, ?, ?)',
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
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    // Fetch user from the database
    const [rows] = await db.query('SELECT * FROM ecousers WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = rows[0];

    if (!user.password) {
      return res.status(500).json({ message: 'Password not found for this user' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT (optional)
    const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

    return res.status(200).json({
      message: 'Login successful',
      userId: user.id,
      username: user.username,
      token, // Include token if using JWT
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 3. Forgot Password
exports.forgotPassword = async (req, res) => {
  const { username, pinNumber, newPassword} = req.body;
  try {
    // Find user
    const [rows] = await db.query('SELECT * FROM ecousers WHERE username = ?', [username]);
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
    await db.query('UPDATE ecousers SET password = ? WHERE id = ?', [hashedNewPassword, user.id]);

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log('GET request for user ID:', req.params.id); // Debugging log
    const [rows] = await db.query(
      'SELECT id, username, email, bio, preferences FROM ecousers WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({  
        message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email, bio, preferences } = req.body;

    const [result] = await db.query(
      'UPDATE ecousers SET username = ?, email = ?, bio = ?, preferences = ? WHERE id = ?',
      [username, email, bio, preferences, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



