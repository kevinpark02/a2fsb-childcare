const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChildSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    profilePicture: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Child = mongoose.model('child', ChildSchema);
module.exports = Child;
