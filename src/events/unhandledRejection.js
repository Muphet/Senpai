const { Event } = require('klasa');
const { DiscordAPIError } = require('discord.js');

module.exports = class extends Event {
	constructor(...args) {
		super(...args, { emitter: process });
	}

	run(err) {
		if (!err) return;
		if (err instanceof DiscordAPIError) Error.captureStackTrace(err);
		this.client.console.error(err);
	}

	init() {
		if (this.client.options.production) this.disable();
	}
};
