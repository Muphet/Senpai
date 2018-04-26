const { Event } = require('klasa');

module.exports = class GuildMemberAddEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'guildMemberAdd',
			enabled: true,
			event: 'guildMemberAdd',
			once: false
		});
	}

	run(member) {
		const { channels, welcome } = member.guild.configs;
		const { enabled, joinMessage } = welcome;
		const { welcome: welcomeChannel } = channels;

		if (!enabled || !welcomeChannel) return;

		return this.client.channels
			.get(welcomeChannel)
			.send(
				joinMessage
					.replace('{user}', member.toString())
					.replace('{servername}', member.guild.name)
					.replace('{username}', member.displayName)
			);
	}
};
