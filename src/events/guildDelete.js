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

	run(guild) {
		this.client.console.log([
			`Left ${guild.name}`,
			`Owner: ${guild.owner.name}[${guild.ownerID}]`,
			`Shard Guild Count is now ${this.client.guilds.size}`
		]);
	}
};
