/* eslint no-throw-literal: 0 */
const { Inhibitor } = require('klasa');

module.exports = class extends Inhibitor {
	constructor(...args) {
		super(...args, {
			name: 'MusicCheck',
			enabled: true,
			spamProtection: true
		});
	}

	async run(msg, cmd) {
		if (cmd.category !== 'Music') return;
		if (!msg.guild) return;
		if (!msg.member) await msg.guild.members.fetch(msg.author);
		const { voiceChannel } = msg.member;
		const { queue } = msg.guild.music;
		let { me } = msg.guild;
		if (cmd.name === 'join') {
			if (!voiceChannel) throw 'You must be in a Voice channel to use this Command!';
			if (!voiceChannel.joinable) throw 'I have no rights to join your Voice channel!';
			if (!voiceChannel.speakable) throw 'I have no rights to speak in your Voice channel!';
			if (me.voiceChannelID) throw `Im already in a Voice channel on this Server!`;
			return;
		}
		if (!me.voiceChannelID) throw `Im not in a Voice channel on this Server. Use the Join command to change that!.`;
		if (['queue', 'clearqueue', 'removsong', 'loop', 'shuffle'].includes(cmd.name)) {
			if (!queue.length) throw 'The Queue is empty!';
		}
		if (['skip', 'nowplaying', 'pause'].includes(cmd.name)) {
			if (!msg.guild.music.playing) throw `Im not playing music!`;
		}
		if (cmd.name === 'resume') {
			if (!msg.guild.music.paused) throw 'The Music is not paused!';
		}
	}
};
