'use strict';
const User = require('../mongooseModel');
const asyncHandler = require('../utils/asyncHandler');

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});
