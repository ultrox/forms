var express = require('express');
var router = express.Router();
var Validator = require('validator');
var isEmpty = require('lodash/isEmpty');
import Survey from '../models/surveys'

function validateInput(data) {
	let errors = {}
	if(Validator.isEmpty(data.email)) {
		errors.email = "Email field is required"
	}
	if(!Validator.isEmail(data.email)) {
		errors.email = "Email is invalid"
	}
	if(Validator.isEmpty(data.firstname)) {
		errors.firstname = "First Name is required"
	}
	if(Validator.isEmpty(data.lastname)) {
		errors.lastname = "Last Name is required"
	}

	if(Validator.isEmpty(toString(data.annualincome))) {
		errors.annualincome = "Annual Income is required"
	}
	if(Validator.isEmpty(data.state)) {
		errors.state = "State is required"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

router.post('/', function(req, res, next) {
	const { errors, isValid } = validateInput(req.body);
	if(isValid) {
		const {firstname, lastname, email, annualincome, state} = req.body;
		console.log(firstname, lastname, email, annualincome, state)
		Survey.forge({
			firstname, lastname, email, annualincome, state
		}, {hasTimestamps: true}).save()
			.then(user => res.json({'success': true}))
			.catch(err => res.status(500).json({error: err}));


	} else {
		res.status(400).json(errors);
	}
});

module.exports = router;
