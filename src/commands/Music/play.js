const { Command, RichMenu } = require('klasa');

module.exports = class PlayCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['add'],
			usage: '<song_or_playlist:str>',
			description: 'Add a Song/Playlist/Livestream from Youtube/Soundcloud/Twitch in the queue.'
		});
	}

	async run(msg, [...query]) {
		if (!msg.guild.music.channel) msg.guild.music.channelID = msg.guild.configs.channels.musiclog || msg.channel.id;
		await msg.send('*adding your Song/Playlist to the queue....*');
		try {
			let songs = [];
			const queryString = query.join(' ');
			if (this.isLink(queryString)) {
				songs = await this.client.lavalink.load(queryString);
			} else {
				const searchResult = await this.client.lavalink.load(`ytsearch: ${queryString}`);
				if (!searchResult) throw new Error('No Song with this name found!');
				const menu = new RichMenu(
					new this.client.methods.Embed()
						.setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
						.setTitle('Song selection')
						.setDescription('Use number reactions to select an Song, use the arrow reactions to scroll between pages.')
						.setColor('RANDOM')
				);

				for (const song of searchResult) {
					menu.addOption(`${song.info.title} - [${this.format(song.info.length / 1000)}]`, `by ${song.info.author}`);
				}

				const collector = await menu.run(await msg.send('Loading Songs for this search...'), { filter: (reaction, user) => user.id === msg.author.id });

				const choice = await collector.selection;
				if (choice === null) return collector.message.delete();
				songs.push(searchResult[choice]);
			}
			if (songs.length > 1) {
				return this._playlist(songs, msg, msg.member);
			} else {
				return this._song(songs[0], msg, msg.member);
			}
		} catch (error) {
			return msg.send(error.message);
		}
	}

	async _playlist(songs, message, member) {
		const promises = [];
		for (const song of songs) {
			promises.push(message.guild.music.queueSong(song, member));
		}
		await Promise.all(promises);
		return message.send(`**Queued** ${songs.length} songs.`);
	}

	async _song(song, message, member) {
		await message.guild.music.queueSong(song, member);
		return message.send(`**Queued:** ${song.info.title}.`);
	}
};
