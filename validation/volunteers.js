const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateVolunteerInput(data) {
    let errors = {};

    data.firstName = validText(data.firstName) ? data.firstName : "";
    data.lastName = validText(data.lastName) ? data.lastName : "";
    data.gender = validText(data.gender) ? data.gender : "";
    data.phone = validText(data.phone) ? data.phone : "";
    data.email = validText(data.email) ? data.email : "";

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }

    if (Validator.isEmpty(data.lastName)) {
      errors.lastName = "Last name field is required";
    }

    if (Validator.isEmpty(data.gender)) {
      errors.gender = "Gender field is required";
    }

    if (Validator.isMobilePhone(data.phone)) {
      // must follow this format to be valid
      // (xxx) xxx - xxxx
      errors.phone = "Phone number is invalid";
    }

    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}