const { Command } = require('klasa');

module.exports = class MusiclogCommand extends Command {
	constructor(...args) {
		super(...args, {
			permLevel: 6,
			usage: '<musiclog:channel>',
			description: 'Changes the musiclog channel set for this server'
		});
	}

	async run(msg, [musiclog]) {
		await msg.guild.configs.update('channels.musiclog', musiclog, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`Musiclog channel successful updated to ${musiclog}`);
	}
};
