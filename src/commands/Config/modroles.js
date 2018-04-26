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

	async run(msg, [modrole]) {
		if (msg.guild.configs.roles.mod.includes(modrole.id)) {
			await msg.guild.configs.update('roles.mod', modrole, { action: 'delete' });
			return msg.send(`**${modrole.name}** Succesfully removed from the Moderation Roles`);
		} else {
			await msg.guild.configs.update('roles.mod', modrole, { action: 'add' });
			return msg.send(`**${modrole.name}** Succesfully added to Moderation Roles`);
		}
	}
};
