const express = require('express');
const router = express.Router();
const postRouter = require('./api/Post');
const authRouter = require('./api/Auth')

router.use('/post', postRouter);
router.use('/auth', authRouter);
module.exports = router;