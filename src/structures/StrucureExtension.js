const { Structures } = require('discord.js');

Structures.extend('GuildMember', DiscordGuildMember => class GuildMember extends DiscordGuildMember {
	get hasModrole() {
		const modRoles = this.client.gateways.guilds.getEntry(this.guild.id).get('roles.mod');
		for (const id of this.roles.keys()) {
			if (modRoles.include(id)) return true;
		}
		return false;
	}

	get hasMusicrole() {
		const musicRoles = this.client.gateways.guilds.getEntry(this.guild.id).get('roles.mod');
		for (const id of this.roles.keys()) {
			if (musicRoles.include(id)) return true;
		}
		return false;
	}
});
