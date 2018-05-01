const { Piece } = require('klasa');
const { discordjs: createLavalink } = require('lavalink');
const { lavalinkPW, lavalinkHost, lavalinkPortWS, LavalinkPort } = process.env;

module.exports = class Lavalink extends Piece {
	constructor(...args) {
		super(...args, {
			name: 'Lavalink',
			enabled: true
		});
	}

	async init() {
		createLavalink(this.client, {
			userID: this.client.user.id,
			password: lavalinkPW,
			hosts: { ws: `ws://${lavalinkHost}:${lavalinkPortWS}`, rest: `http://${lavalinkHost}:${LavalinkPort}` }
		});
		await this.client.lavalink.connect();
		this.client.console.debug('Lavalink Websocket Connection established');
	}
};
