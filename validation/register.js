const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //check that each input is non-empty; if it is, make it empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    

    if(!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    //check that each input is not empty
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Not a valid email';
    }

    //check that each input is not empty
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters';
    }

    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'Password field is required';
    }

    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }

    //if errors obj is empty, then the input is valid, so isValid is true
    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}