const service = require('../../services/Post');

const controller = {};

controller.create = async(req, res) => {
    const { body } = req;
    const validatedPost = service.verifyCreatedField(body);
    if (!validatedPost.success) {
        return res.status(400).json(validatedPost.content);
    }

    console.log(validatedPost)
    console.log(body)
    const post = await service.create(body);
    console.log(post);

    if (!post.success) {
        return res.status(500).json(post.content);
    }

    res.status(201).json(post.content);
}

module.exports = controller;