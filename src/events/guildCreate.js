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

	async run(guild) {
		if (!guild.available) return;
		const botCount = guild.members.filter(member => member.user.bot).size;
		const { memberCount } = guild;
		this.client.console.log([
			`Joined ${guild.name}`,
			`Owner: ${(await guild.members.fetch(guild.ownerID)).displayName}[${guild.ownerID}]`,
			`Members: ${memberCount}`,
			`Bots: ${botCount}[${memberCount / botCount}]`,
			`Shard Guild Count is now ${this.client.guilds.size}`
		]);
		if (this.client.configs.guildBlacklist.includes(guild.id)) {
			guild.leave();
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
		}
	}
};
