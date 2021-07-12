const jwt = require('jsonwebtoken');
const secret = process.env.JWTSECRET || "Secret";
const tools = {};

tools.createToken = (_id) => {
    const payload = {
        _id
    };

    return jwt.sign(payload, secret, { expiresIn: process.env.JWTEXPTIME || "5m" });
}

tools.verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return false;
    }
}

module.exports = tools;