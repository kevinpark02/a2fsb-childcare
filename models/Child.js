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
    birthday: {
        type: String,
        required: true,
    },
    parents: [{
        type: Schema.Types.ObjectId,
        ref: 'volunteers',
        required: true
    }],
    photoId: {
        type: String,
        required: false
    },
    photoUrl: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Child = mongoose.model('child', ChildSchema);
module.exports = Child;
