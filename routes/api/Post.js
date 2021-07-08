const express = require('express');
const router = express.Router();
const controller = require("../../controllers/api/Post");

router.post('/', controller.create);
router.get('/id/:_id', controller.findOneById);
router.get('/all', controller.findAll);
router.patch('/like', controller.addLike);
router.put('/', controller.updatePost);

module.exports = router;