const { Command } = require('klasa');

module.exports = class LoopCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'Starts looping the current queue.'
		});
	}

	run(msg) {
		const { loop } = msg.guild.music;
		if (loop) {
			msg.guild.music.loop = false;
			return msg.send('stopping the loop!');
		} else {
			msg.guild.music.loop = true;
			return msg.send('looping the current queue!');
		}
	}
};
