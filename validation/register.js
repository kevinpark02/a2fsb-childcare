const Validator = require("validator");
const validText = require("./valid-text");
const code = require("../config/keys")

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.firstName = validText(data.firstName) ? data.firstName : "";
    data.lastName = validText(data.lastName) ? data.lastName : "";
    data.gender = validText(data.gender) ? data.gender : "";
    data.phone = validText(data.phone) ? data.phone : "";
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password : "";
    data.password2 = validText(data.password2) ? data.password2 : "";
    data.registrationCode = validText(data.registrationCode) ? data.registrationCode : "";

    if(Validator.isEmpty(data.firstName)) {
        errors.firstName = "First name field is required";
    }

    if(Validator.isEmpty(data.lastName)) {
        errors.lastName = "Last name field is required";
    }

    if(Validator.isEmpty(data.gender)) {
        errors.gender = "Gender field is required";
    }

    if(Validator.isMobilePhone(data.phone)) {
        // must follow this format to be valid
        // (xxx) xxx - xxxx
        errors.phone = "Phone number is invalid";
    }

    if(Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if(!Validator.isLength(data.password, { min: 2, max: 30 })) {
        errors.password = "Password must be between 2 and 30 chars";
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    if(Validator.isEmpty(data.registrationCode)) {
        errors.registrationCode = "Registration code is required";
    }

    if(data.registrationCode !== code.registrationCode) {
        errors.registrationCode = "You do not have the correct code";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }

}