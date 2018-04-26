const { Command } = require('klasa');

module.exports = class JoinCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['summon'],
			description: 'Joins your current VoiceChannel'
		});
	}

	async run(msg) {
		const { voiceChannel, guild } = msg.member;
		await guild.player.join(voiceChannel.id);
		return msg.send('successfull joined your Voice Channel');
	}
};
