const service = require('../../services/Post');
const { verifyByID } = require('../../utils/MongoUtils');
const { verifyTypeNumber } = require('../../utils/MicUtil');
const controller = {};

controller.create = async(req, res) => {
    const { body } = req;
    const validatedPost = service.verifyCreatedField(body);
    if (!validatedPost.success) {
        return res.status(400).json(validatedPost.content);
    }

    try {
        const { user } = req;
        const post = await service.create(body, user._id);
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

controller.findAll = async(req, res) => {
    const { page = 0, limit = 10 } = req.query;
    if (!verifyTypeNumber(page, limit)) {
        return res.status(400).json({ error: "Error of parameters" });
    }

    try {
        const posts = await service.findAll(parseInt(page), parseInt(limit));
        console.log(posts);
        return res.status(200).json(posts.content);
    } catch (err) {
        throw new Error("Internal Server Error");
    }


}

controller.addLike = async(req, res) => {

    const { _id } = req.body;
    if (!verifyByID(_id)) {
        return res.status(400).json({ msg: "Invalid Id" });
    }

    try {
        const postExists = await service.findOneById(_id);
        if (!postExists.success) {
            return res.status(404).json(postExists.content)
        }
        const likeAdded = await service.addLike(postExists.content);
        if (!likeAdded.success) {
            return res.status(409).json(likeAdded.content);
        }
        return res.status(200).json(likeAdded.content);
    } catch (error) {

        return res.status(500).json({ msg: "Internal server error" });
    }
}

controller.updatePost = async(req, res) => {
    const { _id } = req.body;

    if (!verifyByID(_id)) {
        return res.status(400).json({ msg: "Invalid Id" });
    }

    const fieldVerified = service.verifyUpdateFields(req.body);

    if (!fieldVerified.success) {
        return res.status(400).json(fieldVerified.content);
    }

    try {
        const postExists = await service.findOneById(_id);
        if (!postExists.success) {
            return res.status(404).json(postExists.content);
        }

        const { user } = req;

        const userAuthority = service.verifyUserAuthority(postExists.content, user);
        if (!userAuthority.success) {
            return res.status(401).json(userAuthority.content);
        }
        const postUpdated = await service.updateOneByID(
            postExists.content,
            fieldVerified.content,
        );


        if (!postUpdated.success) {
            return res.status(400).json(postUpdated.content);
        }

        return res.status(200).json(postUpdated.content)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

controller.deleteOnByID = async(req, res) => {
    const { _id } = req.body;

    if (!verifyByID(_id)) {
        return res.status(400).json({ msg: "Invalid Id" });
    }

    try {
        const post = await service.findOneById(_id);
        if (!post.success) {
            return res.status(404).json(post.content);
        }

        const { user } = req;

        const userAuthority = service.verifyUserAuthority(post.content, user);
        if (!userAuthority.success) {
            return res.status(401).json(userAuthority.content);
        }

        const postDeleted = await service.deleteOnByID(_id);

        if (!postDeleted.success) {
            return res.status(400).json(postDeleted.content);
        }
        return res.status(200).json(postDeleted.content);
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}
module.exports = controller;