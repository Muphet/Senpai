const { Command } = require('klasa');

module.exports = class PrefixCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<prefix:string{1,5}>',
			description: 'Changes the prefix set for this server'
		});
	}

	async run(msg, [prefix]) {
		await msg.guild.configs.update('prefix', prefix, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`Prefix successful updated to ${prefix}`);
	}
};
