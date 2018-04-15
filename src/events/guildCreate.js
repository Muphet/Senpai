const { Event } = require('klasa');

module.exports = class GuildCreateEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'guildCreate',
			enabled: true,
			event: 'guildCreate',
			once: false
		});
	}

	run(guild) {
		const botCount = guild.members.filter(member => member.user.bot).size;
		const { memberCount } = guild;
		this.client.console.log([
			`Joined ${guild.name}`,
			`Owner: ${guild.owner.name}[${guild.ownerID}]`,
			`Members: ${memberCount}`,
			`Bots: ${botCount}[${memberCount / botCount}]`,
			`Shard Guild Count is now ${this.client.guilds.size}`
		]);
	}
};
