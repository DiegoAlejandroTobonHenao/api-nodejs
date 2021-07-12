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


service.verifyUpdateFields = ({ title, description, image }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!title && !description && !image) {
        serviceResponse = {
            success: false,
            content: {
                msg: "empty fields"
            }
        }
    }

    if (title) serviceResponse.content.title = title;
    if (description) serviceResponse.content.description = description;
    if (image) serviceResponse.content.image = image;

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
        throw err;
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
        throw error;
    }
}

service.findAll = async(page, limit) => {

    let serviceResponse = {
        success: true,
        content: {}
    };

    try {
        const posts = await PostModel.find({}, undefined, {
            skip: page * limit,
            limit: limit,
            sort: [{ updateAt: -1 }]
        }).exec()

        serviceResponse.content = posts
        return serviceResponse;
    } catch (err) {
        throw err;
    }
}

service.addLike = async(post) => {

    let serviceResponse = {
        success: true,
        content: {
            msg: "Like added successfully"
        }
    }
    try {
        post.likes += 1;
        const likeAdded = await PostModel.save();

        if (!likeAdded) {
            serviceResponse = {
                success: false,
                content: {
                    msg: " Not added "
                }
            }
        }
        return serviceResponse;
    } catch (error) {
        throw error;
    }
}

service.updateOneByID = async(post, contentToUpdate) => {

    let serviceResponse = {
        success: true,
        content: {
            msg: "Post Update successful"
        }
    }

    try {
        const updatePost = await PostModel.findByIdAndUpdate(post._id, {
            ...contentToUpdate,
            $push: {
                history: {
                    title: post.title,
                    description: post.description,
                    image: post.image,
                    modifiedAt: new Date(),
                }
            }
        });

        if (!updatePost) {
            serviceResponse = {
                success: false,
                content: {
                    msg: "Post not Update"
                }
            }
        }
        return serviceResponse;
    } catch (error) {

        throw error;
    }

}

service.deleteOnByID = async(_id) => {

    let serviceResponse = {
        success: true,
        content: {
            msg: "Post deleted successful"
        }
    }

    try {
        const postDeleted = await PostModel.findByIdAndDelete(_id).exec();
        if (!postDeleted) {

            serviceResponse = {
                success: false,
                content: {
                    msg: "Post not deleted"
                }
            }
        }
        return serviceResponse;
    } catch (error) {
        throw error;
    }
}
module.exports = service;