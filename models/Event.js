const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    volunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'volunteers',
        required: true
    }],
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'child',
        required: true
    }],
    chef: [{
        type: Schema.Types.ObjectId,
        ref: 'volunteers',
        required: true
    }],
    description: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;