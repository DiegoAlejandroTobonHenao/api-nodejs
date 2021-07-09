const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;


const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    likes: {
        type: Number,
        default: 0,
    },
    history: {
        type: [{
            title: String,
            description: String,
            image: String,
            modifiedAt: Date
        }],
        default: []
    },
    user: {
        type: String,
        required: true,
    },

}, { timeStamp: true, });




module.exports = Mongoose.model("Post", PostSchema);