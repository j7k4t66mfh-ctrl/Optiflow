'use strict';
const express = require('express');
const controller = require('../controllers/dataController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictToAdmin(),
    controller.getData,
  )
  .post(
    authController.protect,
    authController.restrictToAdmin(),
    controller.createData,
  )
  .delete(
    authController.protect,
    authController.restrictToAdmin(),
    controller.deleteAllData,
  );

router.route('/:id').get(
  authController.protect,
  authController.restrictToUser(), // Only users will be able to view their documents on their own
  controller.getSingleData,
);

module.exports = router;
