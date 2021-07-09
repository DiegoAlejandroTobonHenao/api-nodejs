const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const Crypto = require('crypto');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    post: {
        type: [{
            type: Mongoose.Schema.Types.ObjectId,
            rel: "Post"
        }]
    },

    savedPost: {
        type: [{
            type: Mongoose.Schema.Types.ObjectId,
            rel: "Post"
        }]
    }
}, { timeStamp: true });

/**
 * Creamos una propiedad virtual, vive en el conteto de la aplicación pero no
 * no se guarda en la BD. 
 */
UserSchema
    .virtual('password')
    .set(function(password) {
        this.hashedPassword = Crypto.createHmac("sha256", password).digest("hex");
    })

UserSchema.methods = {
    comparePassword: function(password) {
        return this.hashedPassword === Crypto.createHmac("sha256", password).digest("hex");
    }
}
module.exports = Mongoose.model("User", UserSchema);