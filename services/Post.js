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

        return serviceResponse;
    } catch (err) {
        throw new Error("Internal Server Error")
            /**
             *  console.log(err);
                serviceResponse = {
                success: false,
                content: {
                    msg: "Internal error occurred"
                }
            }

            } finally {
            return serviceResponse;
            }
             */
    }
}

service.findOneById = async(_id) => {
    let serviceResponse = {
        success: true,
        content: {
            msg: "Post Found"
        }
    }

    try {
        const post = await PostModel.findById(_id).exec();
        if (!post) {
            serviceResponse = {
                success: false,
                content: {
                    error: " Not found"
                }
            }
        } else {
            serviceResponse.content = post;
        }
        return serviceResponse;
    } catch (error) {
        throw new Error("Internal Server Error");
    }
}

module.exports = service;