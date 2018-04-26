const { Argument } = require('klasa');
const { join } = require('path');
const { UsageError } = require(join(__dirname, '..', 'util', 'CustomErrors.js'));

module.exports = class extends Argument {
	run(arg, possible, msg) {
		let channel = msg.guild.channels.find(ch => {
			if (ch.id === arg) return true;
			if (ch.name.toLowerCase() === arg.toLowerCase()) return true;
			return false;
		});
		if (!channel) throw new UsageError('No Channel with this ID or Name found!');
		if (channel.type !== 'voice') throw new UsageError('This Channel is not a voice channel!');
		return channel;
	}
};
