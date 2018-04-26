const { Command } = require('klasa');

module.exports = class PlayNextCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			usage: '<song_or_playlist:str>',
			description: 'Add a Song/Playlist/Livestream from Youtube/Soundcloud/Twitch on the next playing position in the queue.'
		});
	}

	async run(msg, [...query]) {
		if (!msg.guild.music.channel) msg.guild.music.channelID = msg.guild.configs.channels.musiclog || msg.channel.id;
		await msg.send('*adding your Song/Playlist to the queue....*');
		const player = this.client.lavalink.players.get(msg.guild.id);
		if (!player) return;
		try {
			let songs;
			if (this.isLink(query)) {
				songs = await this.client.lavalink.resolveTrack(query);
			} else {
				let arr = [];
				const searchResult = await this.client.lavalink.resolveTrack(`ytsearch: ${query}`);
				arr.push(searchResult[0]);
				songs = arr;
			}
			if (songs.length > 1) {
				await this._playlist(songs, msg, msg.member);
			} else {
				await this._song(songs[0], msg, msg.member);
			}
		} catch (error) {
			await msg.send(error.message);
		}
	}

	async _playlist(songs, message, member) {
		const promises = [];
		for (const song of songs) {
			promises.push(message.guild.music.queueSongNext(song, member));
		}
		await Promise.all(promises);
		return message.send(`**Queued** ${songs.length} songs.`);
	}

	async _song(song, message, member) {
		await message.guild.music.queueSongNext(song, member);
		return message.send(`**Queued:** ${song.info.title}.`);
	}
};
