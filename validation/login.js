const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};

    //check that each input is non-empty; if it is, make it empty string
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Not a valid email';
    }

    //check that each input is not empty
    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    //if errors obj is empty, then the input is valid, so isValid is true
    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}