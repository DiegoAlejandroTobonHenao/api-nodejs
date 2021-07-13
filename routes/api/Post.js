const express = require('express');
const router = express.Router();
const controller = require("../../controllers/api/Post");

router.post('/', controller.create);
router.get('/id/:_id', controller.findOneById);
router.get('/all', controller.findAll);
router.get('/user', controller.findAllPostsByUser);
router.patch('/like', controller.addLike);
router.put('/', controller.updatePost);
router.delete('/', controller.deleteOnByID)

module.exports = router;