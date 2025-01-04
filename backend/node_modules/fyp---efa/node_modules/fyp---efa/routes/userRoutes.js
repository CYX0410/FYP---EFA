// eco-backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/register
router.post('/register', userController.registerUser);

// POST /api/users/login
router.post('/login', userController.loginUser);

// POST /api/users/forgot-password
router.post('/forgot-password', userController.forgotPassword);

router.post('/profile', userController.profile);

router.get('/profile', userController.getProfile);

router.get('/home', (req, res) => {
    // If you want a simple text response:
    // res.send("Welcome to the Home page from Node.js!");
  
    // Or return some data:
    res.json({ message: "Hello from the Home route!" });
  });

module.exports = router;
