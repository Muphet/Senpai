const { Command } = require('klasa');

module.exports = class ModRolesCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			usage: '<modroles:role>',
			description: 'add\'s a role to the Mod Roles for this server, if the role is already an Mod Role role it will be deleted instead!'
		});
	}

	async run(msg, [musicrole]) {
		if (msg.guild.configs.roles.music.includes(musicrole.id)) {
			await msg.guild.configs.update('roles.music', musicrole, { action: 'delete' });
			return msg.send(`**${musicrole.name}** Succesfully removed from the Music Roles`);
		} else {
			await msg.guild.configs.update('roles.music', musicrole, { action: 'add' });
			return msg.send(`**${musicrole.name}** Succesfully added to Music Roles`);
		}
	}
};
