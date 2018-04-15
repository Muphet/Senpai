const { join } = require('path');
const Client = require(join(__dirname, 'structures', 'Client.js'));
const GatewayInit = require(join(__dirname, 'structures', 'GatewayInit.js'));
require(join(__dirname, 'structures', 'StrucureExtension.js'));

const client = new Client();

GatewayInit.init(client);

client.login(client.config.tokens.bot);
