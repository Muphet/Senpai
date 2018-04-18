const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['GuildMember'],
			name: 'hasModrole',
			enabled: true,
			klasa: false
		});
	}

	get extend() {
		const modRoles = this.guild.configs.roles.mod;
		for (const id of this.roles.keys()) {
			if (modRoles.include(id)) return true;
		}
		return false;
	}
};

