const express = require('express');
const router = express.Router();
const controller = require("../../controllers/api/Post");

router.post('/', controller.create);
router.get('/id/:_id', controller.findOneById)

module.exports = router;