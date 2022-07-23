const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
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
    status: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
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

const Volunteer = mongoose.model('volunteers', VolunteerSchema);
module.exports = Volunteer;