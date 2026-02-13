'use strict';
const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.logIn);
router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch(
  '/updatemypassword',
  authController.protect,
  authController.updatePassword,
);
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictToAdmin(),
    userController.getUsers,
  );

module.exports = router;
