const express = require('express');
const UserController = require("./../../controllers/api/User");
const router = express.Router();

router.get('/', UserController.getUser)
router.put('/', UserController.updateById);
router.patch('/savepost', UserController.savedPost)

module.exports = router;