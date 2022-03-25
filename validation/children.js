const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateChildInput(data) {
    let errors = {};

    data.firstName = validText(data.firstName) ? data.firstName: "";
    data.lastName = validText(data.lastName) ? data.lastName: "";
    data.gender = validText(data.gender) ? data.gender: "";

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name field is required'
    };

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name field is required'
    };

    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required'
    };

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}