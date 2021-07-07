const PostModel = require('../models/Post');
const service = {};

service.verifyCreatedField = ({ title, description, image, user }) => {

    let serviceResponse = {
        success: true,
        content: {
            msg: "good fields"
        }
    }

    if (!title || !user) {
        serviceResponse = {
            success: false,
            content: {
                msg: "empty fields"
            }
        }
        return serviceResponse;
    }
    return serviceResponse;
}
service.create = async({ title, description, image, user }) => {
    let serviceResponse = {
        success: true,
        content: {
            msg: "Post created"
        }
    }

    try {
        const post = new PostModel({ title, description, image, user });
        const postSaved = await post.save();

        if (!postSaved) {
            serviceResponse = {
                success: false,
                content: {
                    msg: "post is empty"
                }
            }
        }
    } catch (err) {
        console.log(err);
        serviceResponse = {
            success: false,
            content: {
                msg: "Internal error occurred"
            }
        }

    } finally {
        return serviceResponse;
    }
}

module.exports = service;