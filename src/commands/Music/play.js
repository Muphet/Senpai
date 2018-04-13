const { Command } = require('klasa');

module.exports = class PlayCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			aliases: ['add'],
			usage: '<song_or_playlist:str>',
			description: 'Add a Song/Playlist/Livestream from Youtube/Soundcloud/Twitch in the queue.'
		});
	}

	async run(msg, [...query]) {
		if (!msg.guild.music.channel) msg.guild.music.channelID = msg.channel.id;
		await msg.send('*adding your Song/Playlist to the queue....*');
		try {
			let songs = [];
			const queryString = query.join(' ');
			if (this.isLink(queryString)) {
				songs = await this.client.lavalink.load(queryString);
			} else {
				const searchResult = await this.client.lavalink.load(`ytsearch: ${queryString}`);
				songs.push(searchResult[0]);
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

	isLink(input) {
		return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g.test(input); // eslint-disable-line no-useless-escape
	}
};
