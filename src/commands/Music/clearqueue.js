const { Command } = require('klasa');

module.exports = class ClearQueueCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Clears the whole queue beside the currently playing one'
		});
	}

	run(msg) {
		msg.guild.music.clear();
		return msg.send('i cleared the whole queue only the playing Song is left!');
	}
};
