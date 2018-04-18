const { Command } = require('klasa');

module.exports = class LimitMusicCommand extends Command {
	constructor(...args) {
		super(...args, {
			permLevel: 6,
			usage: '[limit:boolean]',
			description: 'Changes the musiclog channel set for this server'
		});
	}

	async run(msg, [limit = true]) {
		await msg.guild.configs.update('music.limit', limit, { action: 'add' });
		return msg.send(`Music is ${limit ? 'now limited' : 'not limited anymore'}`);
	}
};
