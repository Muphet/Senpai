const { Event } = require('klasa');

module.exports = class DebugEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'debug',
			enabled: true,
			event: 'debug',
			once: false
		});
	}

	run(message) {
		this.client.console.debug(message);
	}
};
