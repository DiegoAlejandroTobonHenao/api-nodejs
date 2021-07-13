const UserService = require('../../services/User');

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

module.exports = controller;