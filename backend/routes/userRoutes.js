const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/v1/user/signup
router.post('/signup', userController.signup);

// POST /api/v1/user/login
router.post('/login', userController.login);

module.exports = router;