const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define what it means to be a user in our app
    const UserSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                type: String,
                required: true
            }
        ],
        date: {
            type: Date,
            default: Date.now
        }
    });

    // Using mongoose to create the User model
    const User = mongoose.model('users', UserSchema)
    module.exports = User;