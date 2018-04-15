const { join } = require('path');
const Client = require(join(__dirname, 'structures', 'Client.js'));
const permissionsLevels = require(join(__dirname, 'structures', 'PermissionLevel.js'));
const GatewayInit = require(join(__dirname, 'structures', 'GatewayInit.js'));
const { prefix } = process.env;

const client = new Client({
	messageCacheMaxSize: 25,
	messageSweepInterval: 60,
	prefix,
	cmdEditing: true,
	cmdLogging: true,
	cmdPrompt: true,
	ignoreSelf: true,
	ignoreBots: true,
	permissionsLevels,
	providers: { default: 'mongo' },
	promptTime: 20000,
	pieceDefaults: { commands: { deletable: true } },
	readyMessage: readyClient => [
		'-----------------------------------------------------------------------------',
		`Shard ID:              ${readyClient.shard.id}`,
		`Server Count:          ${readyClient.guilds.size}`,
		`Channel Count:         ${readyClient.channels.size}`,
		`User Count:            ${readyClient.users.size}`,
		'-----------------------------------------------------------------------------'
	]
});

GatewayInit.init(client);

client.login(client.tokens.bottoken);
