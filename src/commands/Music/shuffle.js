const { Command } = require('klasa');

module.exports = class ShuffleCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			description: 'Shuffles the currently Queue'
		});
	}

	run(msg) {
		msg.guild.music.shuffle();
		return msg.send('successfully shuffled the queue!');
	}
};
