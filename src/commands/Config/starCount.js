const { Command } = require('klasa');

module.exports = class StarcountCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<required_stars:integer{0}>',
			description: 'Changes the starcount required for the starboard on this server'
		});
	}

	async run(msg, [starboard]) {
		await msg.guild.configs.update('channels.starboard', starboard, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`Starboard channel successful updated to ${starboard}`);
	}
};
