const express = require('express');
const router = express.Router();
const controller = require("../../controllers/api/Post");

router.post('/', controller.createPost);

module.exports = router;