const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateChildInput(data) {
    let errors = {};

    data.firstName = validText(data.firstName) ? data.firstName: "";
    data.lastName = validText(data.lastName) ? data.lastName: "";
    data.gender = validText(data.gender) ? data.gender: "";

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name is required'
    };

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name is required'
    };

    if(Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender is required'
    };

    if(Validator.isEmpty(data.birthday)) {
        errors.birthday = 'Birthday is required'
    }

    if(data.parents.length === 0) {
        errors.parents = "One or two parent(s) are required"
    } 

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}