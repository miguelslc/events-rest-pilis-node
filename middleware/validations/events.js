const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function valideteLoginInput(data) {
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.eventDate = !isEmpty(data.eventDate) ? data.eventDate : '';
    data.place = !isEmpty(data.place) ? data.place : '';
    data.featured = !isEmpty(data.featured) ? data.featured : '';
    data.imageEvent = !isEmpty(data.imageEvent) ? data.imageEvent : '';
    data.author = !isEmpty(data.author) ? data.author : '';

    if (Validator.isEmpty(data.title)) {
        errors.title = 'Title is Required';
    }

    if (Validator.isEmpty(data.description)) {
        errors.description = 'Description is Required';
    }

    if (Validator.isEmpty(data.eventDate)) {
        errors.eventDate = 'Date of the Event is Required';
    }

    if (Validator.isEmpty(data.place)) {
        errors.place = 'A place is Required';
    }

    if (Validator.isEmpty(data.featured)) {
        errors.featured = ' Event Featured is Required';
    }

    if (Validator.isEmpty(data.imageEvent)) {
        errors.imageEvent = 'An Image is Required';
    }

    if (Validator.isEmpty(data.author)) {
        errors.author = 'Author is Required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}