const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    // setupTime: {
    //     type: Date,
    //     required: true
    // },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    // children: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'child',
    //     required: true
    // }],
    // volunteers: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'volunteers',
    //     required: true
    // }],
    // chef: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'volunteers',
    //     required: true
    // }],
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;