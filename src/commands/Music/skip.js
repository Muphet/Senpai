const { Command } = require('klasa');

module.exports = class SkipCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['next'],
			description: 'Skip 1 or more songs',
			usage: '[amount_to_skip:int{0}]'
		});
	}

	async run(msg, [number = 1]) {
		const skipped = await msg.guild.music.skip(number);
		return msg.send(`skipped ${skipped.length} songs`);
	}
};
