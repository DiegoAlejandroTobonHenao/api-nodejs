const service = require('../../services/User');
const { createToken } = require('../../utils/JWTUtils')
const controller = {};

controller.register = async(req, res) => {

    const fieldValidation = service.verifyRegisterFields(req.body);
    console.log(fieldValidation);
    if (!fieldValidation.success) {
        return res.status(400).json(fieldValidation.content);
    }

    try {
        const { userName, email } = req.body;
        const userExists = await service.findOneUsernameOrEmail(userName, email);
        console.log(userExists);
        if (userExists.success === true) {
            return res.status(409).json(userExists.content);
        }

        const userRegistered = await service.register(req.body);

        if (!userRegistered.success) {
            return res.status(409).json(userRegistered.content);
        }
        token
        return res.status(201).json(userRegistered.content);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }


};

controller.login = async(req, res) => {
    const fieldValidation = service.verifyLoginFields(req.body);

    if (!fieldValidation.success) {
        return res.status(400).json(fieldValidation.content);
    }

    try {

        const { identifier, password } = req.body;
        const userExists = await service.findOneUsernameOrEmail(identifier, identifier);

        if (!userExists.success) {
            return res.status(404).json(userExists.content);
        }

        const user = userExists.content;
        if (!user.comparePassword(password)) {
            return res.status(401).json({ msg: "Incorrect password." });
        }
        return res.status(200).json({ token: createToken(user._id) });
    } catch (err) {
        return res.status(500).json({ msg: error.message });
    }

}

module.exports = controller;