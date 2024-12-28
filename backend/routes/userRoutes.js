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

module.exports = router;
