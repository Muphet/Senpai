const { Event } = require('klasa');

module.exports = class ErrorEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'error',
			enabled: true,
			event: 'error',
			once: false
		});
	}

	run(err) {
		return this.client.console.error(err);
	}
};
