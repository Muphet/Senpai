const { Command } = require('klasa');

module.exports = class MusicRoleCommand extends Command {
	constructor(...args) {
		super(...args, {
			permLevel: 6,
			usage: '<musicrole:role>',
			description: 'add\'s a role to the DJ Roles for this server,, if the role is already a DJ Role it will be deleted instead!'
		});
	}

	async run(msg, [musicrole]) {
		if (msg.guild.configs.roles.music.include(musicrole.id)) {
			await msg.guild.configs.update('roles.music', musicrole, { action: 'delete' });
			return msg.send(`**${musicrole.name}** Succesfully removed from the Music Roles`);
		} else {
			await msg.guild.configs.update('roles.music', musicrole, { action: 'add' });
			return msg.send(`**${musicrole.name}** Succesfully added to Music Roles`);
		}
	}
};
