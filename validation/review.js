const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateReviewInput(data) {
    let errors = {};

    // req.body will be just text input, not review.text
    //check that each input is non-empty; if it is, make it empty string
    data.review = !isEmpty(data.review) ? data.review : '';

    //check that each input is not empty
    if(Validator.isEmpty(data.review)) {
        errors.review = 'Review text is required';
    }

    //if errors obj is empty, then the input is valid, so isValid is true
    return {
        errors,
        isValid: isEmpty(errors)
    };
    
}