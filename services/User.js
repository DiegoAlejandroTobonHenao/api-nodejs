const UserModel = require('../models/User');

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})");
const emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\.\-])+\.)+([a-zA-Z0-9]{2,4})+$");

const service = {};

service.verifyRegisterFields = ({ userName, email, password, name, image }) => {

    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!userName || !email || !password || !name) {
        serviceResponse = {
            success: false,
            content: {
                msg: "Required fields empty"
            }
        }

        return serviceResponse;
    }

    if (!emailRegex.test(email)) {
        serviceResponse = {
            success: false,
            content: {
                msg: "Format fields incorrect"
            }
        }
    }

    if (!passwordRegex.test(password)) {
        serviceResponse = {
            success: false,
            content: {
                msg: "password must be 8 - 32 characters and strong"
            }
        }
    }
    return serviceResponse;
}

service.verifyUpdateFields = ({ userName, email, password, name, image }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    if (!userName && !email && !password && !name && !image) {
        serviceResponse = {
            success: false,
            content: { msg: "All empty fields" }
        }
        return serviceResponse;
    }

    if (userName) serviceResponse.content.userName = userName;
    if (name) serviceResponse.content.name = name;
    if (image) serviceResponse.content.image = image;

    if (password) {
        if (!passwordRegex.test(password)) {
            serviceResponse = {
                success: false,
                content: {
                    msg: "password must be 8 - 32 characters and strong"
                }
            }
            return serviceResponse;
        }
        serviceResponse.content.password = password;
    }
    if (email) {
        if (!emailRegex.test(email)) {
            serviceResponse = {
                success: false,
                content: {
                    msg: "Format fields incorrect"
                }
            }
            return serviceResponse;
        }
        serviceResponse.content.email = email;
    }
    return serviceResponse;
}

service.verifyLoginFields = ({ identifier, password }) => {
    let serviceResponse = {
        success: true,
        content: {}
    }
    console.log(identifier, password)
    if (!identifier || !password) {
        serviceResponse = {
            success: false,
            content: { msg: "Requited fields" }
        }
        return serviceResponse;
    };
    return serviceResponse;
}

service.findOneUsernameOrEmail = async(userName, email) => {
    let serviceResponse = {
        success: true,
        content: { msg: "Exist" }
    }

    try {

        const user = await UserModel.findOne({
            $or: [{ userName: userName }, { email: email }]
        }).exec();

        if (!user) {
            serviceResponse = {
                success: false,
                content: { msg: " User Not Found" }
            }
        } else {
            serviceResponse.content = user;
        }
        console.log(serviceResponse)
        return serviceResponse;

    } catch (err) {

        throw err;
    }
}

service.findOneById = async(_id) => {
    let serviceResponse = {
        success: true,
        content: {}
    }

    try {
        const user = await UserModel.findById(_id).select("-hashedPassword").exec();
        if (!user) {
            serviceResponse = {
                success: false,
                content: { error: "User not found" }
            }
        } else {
            serviceResponse.content = user;
        }

        return serviceResponse;
    } catch (err) {
        throw err;
    }
}
service.register = async({ userName, email, password, name, image }) => {
    let serviceResponse = {
        success: true,
        content: { msg: "User Registered successfully" }
    }
    try {
        const user = new UserModel({ userName, email, password, name, image });
        const userRegistered = await user.save();
        if (!user) {
            serviceResponse = {
                success: false,
                content: { msg: "User NOT Registered successfully" }
            }
        }
        return serviceResponse;

    } catch (error) {
        throw error;
    }
}

service.updateById = async(user, contentToUpdate) => {
    let serviceResponse = {
        success: true,
        content: { msg: "User Update successfully" }
    }

    try {
        Object.keys(contentToUpdate).forEach(key => {
            user[key] = contentToUpdate[key];
        })

        const userUpdate = await user.save();
        if (!userUpdate) {
            serviceResponse = {
                success: false,
                content: { msg: "User not updated" }
            }
        }
        return serviceResponse;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

service.addSavedPosts = async(user, postId) => {

    let serviceResponse = {
        success: true,
        content: { msg: "Post registered successfully" }
    }

    try {
        const alreadyExists = user.savedPost.some(post => post.equals(postId));
        if (alreadyExists) {
            serviceResponse = {
                success: false,
                content: { msg: "Post is in list" }
            }
            return serviceResponse;
        }
        user.savedPost.push(postId);
        const userUpdate = await user.save();
        if (!userUpdate) {
            serviceResponse = {
                success: false,
                content: { msg: "Post not saved in list" }
            }
        }

        return serviceResponse;

    } catch (error) {
        throw error;
    }

}
module.exports = service;