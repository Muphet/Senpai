const { Command } = require('klasa');

module.exports = class NowPlayingCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			aliases: ['np'],
			description: 'Shows information about the current playing Song.'
		});
	}

	run(msg) {
		const { nowPlaying } = msg.guild.music;
		return msg.send(
			new this.client.methods.Embed()
				.setAuthor(nowPlaying.userDisplayName, nowPlaying.userAvatarURL)
				.setDescription(`[${nowPlaying.title}](${nowPlaying.url})`)
				.addField('Author', nowPlaying.author, true)
				.addField('Livestream?', nowPlaying.isStream ? 'Yes' : 'No', true)
				.addField('Length', nowPlaying.isStream ? '∞ (Livestream)' : this.format(nowPlaying.length / 1000), true)
				.setColor(0xffcc00)
		);
	}
};
