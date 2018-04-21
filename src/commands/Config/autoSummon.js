const { Command } = require('klasa');

module.exports = class AutoSummonCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<channel:vcresolvable>',
			description: 'Changes the default voiceChannel to join for this server (on Bot Restarts as example, or Discord outages)'
		});
	}

	async run(msg, [voicechannel]) {
		await msg.guild.configs.update('channels.music', voicechannel, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`AutoSummon channel successful updated to **${voicechannel.name}**`);
	}
};
