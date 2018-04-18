const { join } = require('path');
const Client = require(join(__dirname, 'structures', 'Client.js'));

const client = new Client();

client.login(client.config.tokens.bot);
