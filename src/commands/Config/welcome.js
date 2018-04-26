const { Command } = require('klasa');

module.exports = class WelcomeCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<enabled:boolean>',
			description: 'enable/disable welcomming messages on this server'
		});
	}

	async run(msg, [enabled]) {
		await msg.guild.configs.update('welcome.enabled', enabled);
		return msg.send(`Succesfull ${enabled ? 'enabled' : 'disabled'} welcome/leave messages on this server`);
	}
};
