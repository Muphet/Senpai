const { Command } = require('klasa');

module.exports = class ModLogCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<modlog:channel>',
			description: 'Changes the modlog channel set for this server'
		});
	}

	async run(msg, [modlog]) {
		await msg.guild.configs.update('channels.modlog', modlog, { avoidUnconfigurable: true, action: 'add' });
		return msg.send(`Modlog channel successful updated to ${modlog}`);
	}
};
