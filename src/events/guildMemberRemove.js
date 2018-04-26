const { Event } = require('klasa');

module.exports = class GuildMemberRemoveEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'guildMemberRemove',
			enabled: true,
			event: 'guildMemberRemove',
			once: false
		});
	}

	run(member) {
		const { channels, welcome } = member.guild.configs;
		const { enabled, leaveMessage } = welcome;
		const { welcome: welcomeChannel } = channels;

		if (!enabled || !welcomeChannel) return;

		return this.client.channels
			.get(welcomeChannel)
			.send(
				leaveMessage
					.replace('{user}', member.toString())
					.replace('{servername}', member.guild.name)
					.replace('{username}', member.displayName)
			);
	}
};
