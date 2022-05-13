const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
    let errors = {};

    data.eventName = validText(data.eventName) ? data.eventName : "";
    
    if(Validator.isEmpty(data.eventName)) {
        errors.eventName = 'Event name is required'
    };

    if(Validator.isEmpty(data.setupTime)) {
        errors.setupTime = 'Baby sitting set up time is required'
    };

    if(Validator.isEmpty(data.startTime)) {
        errors.startTime = 'Baby sitting start time is required'
    };

    if(Validator.isEmpty(data.endtime)) {
        errors.endtime = 'Baby sitting end time is required'
    };

    if(data.children.length === 0) {
        errors.children = 'One of more children are required'
    };

    if(data.volunteers.length < 2) {
        errors.volunteers = 'Two or more baby sitters are required'
    };

    if(data.chef.length < 1) {
        errors.chef = 'Please put someone in charge of food'
    };

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}