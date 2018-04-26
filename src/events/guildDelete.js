const { Event } = require('klasa');

module.exports = class GuildDeleteEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'guildDelete',
			enabled: true,
			event: 'guildDelete',
			once: false
		});
	}

	async run(guild) {
		if (!guild.available) return;
		this.client.console.log([
			`Left ${guild.name}`,
			`Owner: ${(await this.client.users.fetch(guild.ownerID)).username}[${guild.ownerID}]`,
			`Shard Guild Count is now ${this.client.guilds.size}`
		]);
		if (!this.client.configs.preserveConfigs) guild.configs.destroy().catch(() => null);
	}
};
