const { Command } = require('klasa');

module.exports = class ConfigCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 6,
			description: 'Shows the current config from this server'
		});
	}

	run(msg) {
		const { music: { limited }, starboard: { count }, welcome: { enabled, joinMessage, leaveMessage }, channels: { welcome, musiclog, starboard, modlog }, roles: { mod, music: musicRole }, prefix } = msg.guild.configs;
		return msg.send(
			new this.client.methods.Embed()
				.setTitle(`Configuration for ${msg.guild.name}`)
				.setThumbnail(msg.guild.iconURL)
				.setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
				.addField('Prefix', prefix, true)
				.addField('Modlog Channel', modlog ? `<#${modlog}>` : 'not set', true)
				.addField('Starboard Channel', starboard ? `<#${starboard}>` : 'not set', true)
				.addField('Music Channel', musiclog ? `<#${musiclog}>` : 'not set', true)
				.addField('Moderation Roles', mod.length ? mod.map(input => `<@&${input}>`).join(', ') : 'no roles set', true)
				.addField('Music Roles', musicRole.length ? musicRole.map(input => `<@&${input}>`).join(', ') : 'no roles set', true)
				.addField('Music feature limited?', limited ? 'Yes' : 'No', true)
				.addField('Starboard Stars', count.toString(), true)
				.addField('Welcome Messages on?', enabled ? 'Yes' : 'No', true)
				.addField('Welcome Channel', welcome ? `<#${welcome}>` : 'not set', true)
				.addField('Welcome Message', joinMessage ? joinMessage : 'not set', true)
				.addField('Leave Message', leaveMessage ? leaveMessage : 'not set', true)
				.setColor('RANDOM')
				.setTimestamp()
		);
	}
};
