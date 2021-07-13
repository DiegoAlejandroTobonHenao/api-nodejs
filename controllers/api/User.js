const UserService = require('../../services/User');
const PostService = require('../../services/Post');
const { verifyByID } = require('../../utils/MongoUtils');
const controller = {};

controller.getUser = (req, res) => {
    const { user } = req;

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
}

controller.updateById = async(req, res) => {
    const { user } = req;

    const verifyFields = UserService.verifyUpdateFields(req.body);

    if (!verifyFields.success) {
        return res.status(400).json(verifyFields.content)
    }

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    try {
        const userUpdate = await UserService.updateById(user, verifyFields.content);
        if (!userUpdate.success) {
            return res.status(409).json(userUpdate.content)
        }
        return res.status(200).json(userUpdate.content)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Internal server error" })
    }
}

controller.savedPost = async(req, res) => {
    const { postId } = req.body;
    const { user } = req;
    if (!verifyByID(postId)) {
        return res.status(400).json({ msg: "Error in ID" });
    }

    try {
        const postExists = await PostService.findOneById(postId);
        if (!postExists.success) {
            return res.status(404).json(postExists.content);
        }

        const userUpdated = await UserService.addSavedPosts(user, postId);
        if (!userUpdated.success) {
            return res.status(409).json(userUpdated.content);
        }
        return res.status(200).json(userUpdated.content);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }

}

module.exports = controller;