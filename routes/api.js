const express = require('express');
const router = express.Router();


const AuthMiddleware = require("./../middlewares/Auth");
const postRouter = require('./api/Post');
const authRouter = require('./api/Auth')
router.use('/auth', authRouter);
router.use(AuthMiddleware.verifyAuth);
router.use('/post', postRouter);

module.exports = router;