const { Command } = require('klasa');

module.exports = class LeaveCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			description: 'Leave the VoiceChannel im currently connected to and removes the queue.'
		});
	}

	async run(msg) {
		const { guild } = msg.member;
		guild.music.reset();
		await guild.player.leave();
		return msg.send('bye bye :wave:');
	}
};
