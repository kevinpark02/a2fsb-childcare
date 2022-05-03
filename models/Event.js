const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    eventName: {
        type: String,
        required: true
    }
})

const Event = mongoose.model('event', EventSchema);
module.exports = Event;