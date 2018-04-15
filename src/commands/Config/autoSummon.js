const { Command } = require('klasa');
const { join } = require('path');
const { UsageError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));
module.exports = class AutoSummonCommand extends Command {
	constructor(...args) {
		super(...args, {
			permLevel: 6,
			usage: '<channelResolvable:str>',
			description: 'Changes the default voiceChannel to join for this server'
		});
	}

	async run(msg, [channelResolvable]) {
		let channel = msg.guild.channels.find(ch => {
			if (ch.id === channelResolvable) return true;
			if (ch.name.toLowerCase() === channelResolvable.toLowerCase()) return true;
			return false;
		});
		if (!channel) throw new UsageError('No Channel with this ID or Name found!');
		await msg.guild.configs.update('channels.music', channel, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`AutoSummon channel successful updated to ${channel.name}`);
	}
};
