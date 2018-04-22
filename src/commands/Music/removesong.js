const { Command } = require('klasa');

module.exports = class RemoveSongCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			usage: '<SongIndex:int{0}>',
			aliases: ['deletesong'],
			description: 'Deletes a song from the queue.'
		});
	}

	run(msg, [index]) {
		const deletedSong = msg.guild.music.remove(index);
		return msg.send(`I've deleted the Song ${deletedSong.title} from the queue`);
	}
};
