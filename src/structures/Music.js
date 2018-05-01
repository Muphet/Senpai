const { Permissions: { Flags: { SEND_MESSAGES } } } = require('discord.js');
const { join } = require('path');
const Song = require(join(__dirname, 'Song'));

module.exports = class Music {
	constructor(client, id) {
		this.client = client;
		this.id = id;
		this.channelID = null;
		this.queue = [];
		this.loop = false;
		this.preparing = false;
		this.player.on('event', this._handleEvent.bind(this));
	}

	queueSong(songInfo, member) {
		const song = new Song(songInfo, member);
		this.queue.push(song);
		return this._play();
	}

	queueSongNext(songInfo, member) {
		const song = new Song(songInfo, member);
		this.queue.splice(1, 0, song);
		return this._play();
	}

	async skip(amount = 1) {
		const realAmount = amount - 1;
		const skipped = this.queue.splice(0, realAmount);
		const skip = this.nowPlaying;
		await this._stop();
		if (!realAmount) {
			return [skip];
		} else {
			skipped.push(skip);
			return skipped;
		}
	}

	pause(boolean = true) {
		return this.player.pause(boolean);
	}

	shuffle() {
		return this._shuffle(this.queue);
	}

	remove(index) {
		return this.queue.splice(index, 1);
	}

	clear() {
		this.queue.length = 1;
	}

	reset() {
		if (this.queue.length) this.queue.length = 0;
		if (this.loop) this.loop = false;
		if (this.playing) this._stop();
	}

	async _play(options) {
		if (this.busy || !this.queue.length) return;
		this.preparing = true;
		const { channel, nowPlaying } = this;
		const embed = new this.client.methods.Embed()
			.setAuthor(nowPlaying.userDisplayName, nowPlaying.userAvatarURL)
			.addField('Now Playing:', `[${nowPlaying.title}](${nowPlaying.url})`)
			.setColor('RANDOM');
		if (channel && channel.permissionsFor(channel.guild.me).has(SEND_MESSAGES)) channel.send(embed);
		const { track } = nowPlaying;
		await this.player.play(track, options);
		this.preparing = false;
	}

	_stop() {
		return this.player.stop();
	}

	_handleEvent(event) {
		const shifted = this.queue.shift();
		if (event.type === 'TrackEndEvent') {
			return this._finished(event, shifted);
		} else if (event.type === 'TrackExceptionEvent') {
			return this._failed(event);
		} else {
			return this._stuck();
		}
	}

	_finished(event, shifted) {
		if (this.loop) this.queue.push(shifted);
		return this._play();
	}

	_failed(event) {
		const { channel } = this;
		if (channel && channel.permissionsFor(channel.guild.me).has(SEND_MESSAGES)) channel.send(`\`[ERROR]\` ${event.error}\nSong was skipped due error.`);
	}

	_stuck() {
		const { channel } = this;
		if (channel && channel.permissionsFor(channel.guild.me).has(SEND_MESSAGES)) channel.send(`\`[Track Got Stuck]\` Skipped to the next one.`);
		return this._play();
	}

	_shuffle(queue) {
		let firstSong = queue.shift();
		let currentIndex = queue.length,
			randomIndex,
			temporaryValue;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = queue[currentIndex];
			queue[currentIndex] = queue[randomIndex];
			queue[randomIndex] = temporaryValue;
		}

		queue.unshift(firstSong);

		return queue;
	}

	get guild() {
		return this.client.guilds.get(this.id);
	}

	get channel() {
		return this.client.channels.get(this.channelID);
	}

	get busy() {
		return this.playing || this.paused || this.preparing;
	}

	get status() {
		return this.player.status;
	}

	get playing() {
		return this.player.playing;
	}

	get paused() {
		return this.player.paused;
	}

	get player() {
		return this.guild.player;
	}

	get nowPlaying() {
		return this.queue[0];
	}
};
