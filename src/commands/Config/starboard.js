const { Command } = require('klasa');

module.exports = class StarboardCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<starboard:channel>',
			description: 'Changes the starboard channel set for this server'
		});
	}

	async run(msg, [starboard]) {
		await msg.guild.configs.update('channels.starboard', starboard, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`Starboard channel successful updated to ${starboard}`);
	}
};
