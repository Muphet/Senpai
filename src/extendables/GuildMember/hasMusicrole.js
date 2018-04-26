const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['GuildMember'],
			name: 'hasMusicrole',
			enabled: true,
			klasa: false
		});
	}

	get extend() {
		const musicRoles = this.guild.configs.roles.music;
		for (const id of this.roles.keys()) {
			if (musicRoles.includes(id)) return true;
		}
		return false;
	}
};

