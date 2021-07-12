const { verifyToken } = require('../utils/JWTUtils');
const { verifyByID } = require('../utils/MongoUtils');
const UserService = require("./../services/User");
const middleware = {};

middleware.verifyAuth = async(req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(403).json({ error: "Authorization is required" });
    }
    /**
     * Bearer : metodo de authentication cuando utilizamos tokens
     */
    const [prefix, token] = authorization.split(" ");

    if (prefix !== "Bearer") {
        return res.status(400).json({ error: "Incorrect Prefix" });
    }

    const tokenObject = verifyToken(token);

    if (!tokenObject) {
        return res.status(401).json({ error: "Invalid Token" })
    }

    const userID = tokenObject._id;

    if (!verifyByID(userID)) {
        return res.status(400).json({ error: "Error in Id" });
    }

    const userExists = await UserService.findOneById(userID);
    if (!userExists.success) {
        return res.status(404).json(userExists.content);
    }

    req.user = userExists.content;

    next();

}
module.exports = middleware;