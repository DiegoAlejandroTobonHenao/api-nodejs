const Mongoose = require('mongoose');

const tools = {};

tools.verifyByID = (_id) => {

    if (!_id) {
        return false;
    }

    return Mongoose.Types.ObjectId.isValid(_id);
}



module.exports = tools;