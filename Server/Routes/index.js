const express = require('express');
const userRouter = require('./user.js');
const messageRouter = require('./messages.js');
const router = express.Router();

router.use('/user',userRouter);
router.use('/messages',messageRouter);

module.exports = router;