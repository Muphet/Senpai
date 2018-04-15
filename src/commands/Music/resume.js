const { Command } = require('klasa');

module.exports = class ResumeCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			description: 'pause the current playing song.'
		});
	}

	async run(msg) {
		await msg.guild.music.pause(false);
		return msg.send('paused the player!');
	}
};
