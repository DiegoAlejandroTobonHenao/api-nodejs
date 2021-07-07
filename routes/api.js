const express = require('express');
const router = express.Router();
const postRouter = require('./api/Post');

router.use('/post', postRouter);
module.exports = router;