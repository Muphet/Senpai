const { PermissionLevels } = require('klasa');

module.exports = new PermissionLevels()
	.add(0, () => true)
	.add(2, (client, msg) => msg.guild && msg.member.hasMusicrole, { fetch: true })
	.add(3, (client, msg) => msg.guild && msg.channel.permissionsFor(msg.member).has('MANAGE_MESSAGES'), { fetch: true })
	.add(4, (client, msg) => msg.guild && msg.member.permissions.has('KICK_MEMBERS'), { fetch: true })
	.add(5, (client, msg) => msg.guild && msg.member.permissions.has('BAN_MEMBERS'), { fetch: true })
	.add(6, (client, msg) => msg.guild && msg.member.hasModrole, { fetch: true })
	.add(7, (client, msg) => msg.guild && msg.member.permissions.has(['MANAGE_GUILD', 'ADMINISTRATOR']), { fetch: true })
	.add(8, (client, msg) => msg.guild && msg.member === msg.guild.owner, { fetch: true })
	.add(9, (client, msg) => msg.author === client.owner, { break: true })
	.add(10, (client, msg) => msg.author === client.owner);
