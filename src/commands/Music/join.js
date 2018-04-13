const { Command } = require('klasa');

module.exports = class JoinCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			aliases: ['summon'],
			description: 'Joins your current VoiceChannel'
		});
	}

	run(msg) {
		const { voiceChannel, guild } = msg.member;
		guild.player.join(voiceChannel.id);
		return msg.send('successfull joined your Voice Channel');
	}
};
