const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Command'],
			name: 'firstCharUpper',
			enabled: true,
			klasa: true
		});
	}

	extend(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
};

