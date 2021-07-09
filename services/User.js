const UserModel = require('../models/User');

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})");
const emailRegex = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9_\.\-])+\.)+([a-zA-Z0-9]{2,4})+$");

const service = {};

service.verifyRegisterFields = ({ userName, email, password, name, photo }) => {

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
        console.log(err);
        throw new Error("several Server Error");
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
        throw new Error("Internal Server Error");
    }
}

module.exports = service;