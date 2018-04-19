const { Command } = require('klasa');
const { join } = require('path');
const { UsageError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class AutoSummonCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<channel:vcresolvale>',
			description: 'Changes the default voiceChannel to join for this server (on Bot Restarts as example, or Discord outages)'
		});

		this.createCustomResolver('vcresolvale', (arg, possible, msg) => {
			let channel = msg.guild.channels.find(ch => {
				if (ch.id === arg) return true;
				if (ch.name.toLowerCase() === arg.toLowerCase()) return true;
				return false;
			});
			if (!channel) throw new UsageError('No Channel with this ID or Name found!');
			if (channel.type !== 'voice') throw new UsageError('This Channel is not a voice channel!');
			return channel;
		});
	}

	async run(msg, [voicechannel]) {
		await msg.guild.configs.update('channels.music', voicechannel, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`AutoSummon channel successful updated to **${voicechannel.name}**`);
	}
};
