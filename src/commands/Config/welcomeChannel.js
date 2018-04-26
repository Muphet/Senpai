const { Command } = require('klasa');

module.exports = class WelcomeChannelCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<channel:channel>',
			description: 'set the channel for welcome/leave messages'
		});
	}

	async run(msg, [channel]) {
		await msg.guild.configs.update('channels.welcome', channel);
		return msg.send(`Welcome channel successful updated to ${channel}`);
	}
};
