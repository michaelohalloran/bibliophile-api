const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateBookInput(data) {
    let errors = {};

    //check that each input is non-empty; if it is, make it empty string
    data.title = !isEmpty(data.title) ? data.title : '';

    //check that each input is not empty
    if(Validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if(!isEmpty(data.image)) {
        if(!Validator.isURL(data.image)) {
            errors.image = 'Invalid URL';
        }
    }

    //if errors obj is empty, then the input is valid, so isValid is true
    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}