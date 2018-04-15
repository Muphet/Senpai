const { Event } = require('klasa');

module.exports = class KlasaReadyEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'klasaReady',
			enabled: true,
			event: 'klasaReady',
			once: false
		});
	}

	run() {
		this.client.console.debug('All Pieces Initialized');
		for (const guild of this.client.guilds.values()) {
			if (guild.configs.channels.music) guild.player.join(guild.configs.channels.music);
		}
	}
};
