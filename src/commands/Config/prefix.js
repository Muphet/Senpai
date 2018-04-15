const { Command } = require('klasa');


module.exports = class PrefixCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			botPerms: ['EMBED_MESSAGE'],
			usage: '<prefix:string{1,5}>',
			description: 'Shows my current Ping to the Discord API'
		});
	}

	async run(msg, [prefix]) {
		msg.guild.configs.update('prefix', prefix);
	}
};
