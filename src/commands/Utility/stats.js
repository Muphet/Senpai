const { Command } = require('klasa');

module.exports = class StatsCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows stats about this bot'
		});
	}

	async run(msg) { // eslint-disable-line no-unused-vars

	}
};
