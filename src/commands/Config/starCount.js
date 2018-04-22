const { Command } = require('klasa');

module.exports = class StarcountCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<required_stars:number{0}>',
			description: 'Changes the starcount required for the starboard on this server'
		});
	}

	async run(msg, [stars]) {
		await msg.guild.configs.update('starboard.count', stars);
		return msg.send(`Starboard count successfully updated to ${stars}`);
	}
};
