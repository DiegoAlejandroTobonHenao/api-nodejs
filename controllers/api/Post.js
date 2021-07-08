const service = require('../../services/Post');
const { verifyByID } = require('../../utils/MongoUtils');
const controller = {};

controller.create = async(req, res) => {
    const { body } = req;
    const validatedPost = service.verifyCreatedField(body);
    if (!validatedPost.success) {
        return res.status(400).json(validatedPost.content);
    }

    try {
        const post = await service.create(body);
        if (!post.success) {
            return res.status(409).json(post.content);
            // peticion no aceptable
        }
        return res.status(201).json(post.content);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

controller.findOneById = async(req, res) => {
    const { _id } = req.params;
    if (!verifyByID(_id)) {
        return res.status(400).json({ error: "Error Id" })
    }
    try {

        const postExists = await service.findOneById(_id);

        if (!postExists.success) {
            return res.status(400).json(postExists.content);
        }

        return res.status(200).json(postExists.content);
    } catch (err) {
        throw new Error("Internal server error");
    }
}

module.exports = controller;