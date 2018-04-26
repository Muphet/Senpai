const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Command'],
			name: 'format',
			enabled: true,
			klasa: true
		});
	}

	extend(seconds) {
		const { pad } = this;
		let hours = Math.floor(seconds / (60 * 60));
		let minutes = Math.floor(seconds % (60 * 60) / 60);
		let seconds2 = Math.floor(seconds % 60);

		return `${pad(hours)}:${pad(minutes)}:${pad(seconds2)}`;
	}
};

