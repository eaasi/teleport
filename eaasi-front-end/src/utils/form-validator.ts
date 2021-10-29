export default {

	validate(validationString: string, value: string, name: string = '') {

		const required = validationString.toLowerCase().indexOf('required') > -1;

		// If value is blank, just validate based on whether or not one was required
		if(!value || value === '') {
			if(!required) return null;
			return 'This field is required.';
		}
		// If there are no rules, value is valid
		const rules = this._getRules(validationString);
		if(!rules || !rules.length) return null;

		const self = this;

		for (let i = 0; i < rules.length; i++) {
			// eslint-disable-next-line
			let limit, { rule, param } = rules[i];
			switch (rule) {
			case 'email':
				if (!self.validateEmail(value) && value !== '') {
					return 'Please enter a valid email address';
				}
				break;
			case 'phone':
				if (!self.validatePhone(value) && value !== '') {
					return 'Please enter a valid US phone number';
				}
				break;
			case 'min':
			case 'minlength':
				limit = Number(param);
				if(isNaN(limit)) return;
				if(value.length < limit) {
					const msg = `be at least ${limit} characters`;
					return name ? name + ' must ' + msg : 'Must' + msg;
				}
				break;
			case 'max':
			case 'maxlength':
				limit = Number(param);
				if(isNaN(limit)) return;
				if(value.length > limit) {
					const msg = `exceed ${(limit)} characters`;
					return name ? `${name} can not ${msg}`: `Can not ${msg}`;
				}
				break;
			case 'exactlength':
				limit = Number(param);
				if(isNaN(limit)) return;
				if(value.length !== limit) {
					const msg = `be ${limit} characters`;
					return name ? name + ' must ' + msg : 'Must' + msg;
				}
				break;
			case 'zip':
				if (!self.validateZip(value)) {
					return 'Please enter a valid Zip Code';
				}
				break;
			case 'url':
				if(!self.validateUrl(value)) {
					return 'Please enter a valid URL';
				}
				break;
			case 'url-key':
				if (!self.validateUrlKey(value)) {
					return 'Please enter a valid URL';
				}
				break;
			case 'regex':
				const regex = new RegExp(param);
				if(!regex.test(value)) {
					return 'Invalid format';
				}
				break;
			case 'colorhex':
				const re = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
				if(!re.test(value)) {
					return 'Invalid hex color';
				}
				break;
			case 'time':
				if(!self.validateTime(value)) {
					return 'Invalid time';
				}
				break;
			case 'numeric':
			case 'number':
				if(!self.validateNumber(value)) {
					return 'Please enter a valid number';
				}
				break;
			}
		}
		return null;
	},

	/*============================================================
    == Helpers
    /============================================================*/

	validateEmail(email: string) {
		if (!email) return false;
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},

	validateNumber(num: string) {
		return !isNaN(Number(num));
	},

	validatePhone(phone: string) {
		if (!phone) return true;
		phone = phone.replace(/\s+/g, '');
		return phone.length > 9 && /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/.test(phone);
	},

	validateZip(zip: string) {
		return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
	},

	validateUrl(url: string) {
		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(url);
	},

	validateUrlKey(url: string) {
		return /^[-a-z0-9]+$/.test(url);
	},

	validateTime(time: string) {
		return /^(0?[1-9]|1[012])(:[0-5]\d) ?[APap][mM]$/.test(time);
	},

	_getRules(validationString: string) {
		if(typeof validationString !== 'string') return [];
		const validations = validationString.split('|');
		const rules = [];
		for(let i=0; i<validations.length; i++) {
			const values = validations[i].toLowerCase().split(':');
			rules.push({ rule: values[0], param: values[1] || null });
		}
		return rules;
	}

};