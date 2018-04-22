const { Event } = require('klasa');

module.exports = class ReadyEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'ready',
			enabled: true,
			event: 'ready',
			once: false
		});
	}

	run() {
		this.client.console.debug('Connected/Reconnected to the Discord API');
		return this.client.user.setActivity(`${this.client.config.constants.prefix}help || Version: ${this.client.version} || ${this.client.guilds.size} Servers`);
	}
};
