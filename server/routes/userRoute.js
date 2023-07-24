const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middlewares/checkAuth');

// Define user routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/home', checkAuth, userController.home);
router.get('/profile', checkAuth, userController.fetchUserById);

module.exports = router;