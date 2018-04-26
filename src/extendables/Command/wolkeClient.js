const { Extendable } = require('klasa');
const { Client, TokenTypes: { Wolke } } = require('weebts');
let wolkeClient;

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Command'],
			name: 'wolkeClient',
			enabled: true,
			klasa: true
		});
	}

	get extend() {
		if (!wolkeClient) {
			wolkeClient = new Client({
				tokenType: Wolke,
				token: this.client.config.tokens.wolke,
				userAgent: `Senpai/${this.client.version}`
			});
		}
		return wolkeClient;
	}
};

