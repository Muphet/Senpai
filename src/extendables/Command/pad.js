const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Command'],
			name: 'pad',
			enabled: true,
			klasa: true
		});
	}

	extend(seconds) {
		return (seconds < 10 ? '0' : '') + seconds;
	}
};

