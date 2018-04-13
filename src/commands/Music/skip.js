const { Command } = require('klasa');

module.exports = class SkipCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			aliases: ['next'],
			description: 'Skip the currently playing song',
			usage: '[amount_to_skip:number]'
		});
	}

	async run(msg, [number = 1]) {
		const skipped = await msg.guild.music.skip(number - 1);
		return msg.send(`skipped ${skipped.length} songs`);
	}
};
