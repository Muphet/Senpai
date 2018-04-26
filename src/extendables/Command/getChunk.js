const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Command'],
			name: 'getChunk',
			enabled: true,
			klasa: true
		});
	}

	extend(array, amount) {
		const splitted = [];
		for (let i = 0; i < array.length; i += amount) {
			splitted.push(array.slice(i, i + amount));
		}
		return splitted;
	}
};

