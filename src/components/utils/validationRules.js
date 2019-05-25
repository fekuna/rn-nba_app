const validation = (value, rules, form) => {
	let isValid = true;

	for (let rule in rules) {
		switch (rule) {
			case 'isRequired':
				isValid = isValid && validateRequired(value);
				break;
			case 'isEmail':
				isValid = isValid && validateEmail(value);
				break;
			case 'minLength':
				isValid = isValid && validateMinLength(value, rules[rule]);
				break;
			case 'maxLength':
				isValid = isValid && validateMaxLength(value, rules[rule]);
				break;
			case 'confirmPass':
                isValid = isValid && validateConfirmPass(value, form[rules.confirmPass].value);
                break;
			default:
				isValid = true;
		}
	}

	return isValid;
};

const validateRequired = (value) => {
	if (value !== '') {
		return true;
	}
	return false;
};

const validateEmail = (value) => {
	const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return expression.test(String(value).toLowerCase());
};

const validateMinLength = (value, ruleValue) => {
	if (value.length >= ruleValue) {
		return true;
	}
	return false;
};

const validateMaxLength = (value, ruleValue) => {
	if (value.length <= ruleValue) {
		return true;
	}
	return false;
};

const validateConfirmPass = (confirmPass, pass) => {
	return confirmPass === pass;
};

export default validation;
