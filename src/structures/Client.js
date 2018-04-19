const { Client } = require('klasa');
const { join } = require('path');
const { version } = require(join(__dirname, '..', '..', 'package.json'));
const CustomPieceStore = require(join(__dirname, 'CustomPieceStore.js'));
const permissionsLevels = require(join(__dirname, 'PermissionLevel.js'));
const {
	bottoken: bot,
	osuToken: osu,
	googleToken: google,
	omwToken: owm,
	dBotsToken: dBots,
	discordbotsToken: discordBots,
	wolkeToken: wolke,
	supportServerLink,
	pixabayToken: pixabay,
	voteLink,
	prefix,
	databaseName: name,
	databaseHost: host,
	databasePort: port
} = process.env;

module.exports = class SenpaiClient extends Client {
	constructor(options) {
		super({
			...options,
			messageCacheMaxSize: 25,
			messageSweepInterval: 60,
			prefix,
			cmdEditing: true,
			cmdLogging: true,
			ignoreSelf: true,
			ignoreBots: true,
			permissionsLevels,
			providers: { default: 'mongo' },
			pieceDefaults: { commands: { deletable: true, promptLimit: 2, promptTime: 60000, cooldown: 2 } },
			schedule: { interval: 1000 },
			readyMessage: readyClient => [
				'-----------------------------------------------------------------------------',
				`Shard ID:              ${readyClient.shard.id}`,
				`Server Count:          ${readyClient.guilds.size}`,
				`Channel Count:         ${readyClient.channels.size}`,
				`User Count:            ${readyClient.users.size}`,
				'-----------------------------------------------------------------------------'
			],
			presence: { activity: { name: 'My Dev', type: 'WATCHING' } }
		});
		this.version = version;
		this.config = {
			tokens: {
				bot,
				osu,
				google,
				owm,
				dBots,
				discordBots,
				pixabay,
				wolke
			},
			constants: {
				supportServerLink,
				voteLink,
				prefix
			},
			db: {
				host,
				name,
				port
			}
		};
		this.customPieceStore = new CustomPieceStore(this);
		this.registerStore(this.customPieceStore);
	}
};
