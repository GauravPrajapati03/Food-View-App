const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// User Api's
router.post('/user/register', authController.registerUser);
router.post('/user/login', authController.loginUser);
router.get('/user/profile/:id', authController.getProfile);
router.get('/user/logout', authController.logoutUser);

// Food Partner Api's
router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner);

module.exports = router;