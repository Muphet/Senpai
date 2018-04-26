const { Command } = require('klasa');
const { get } = require('snekfetch');

module.exports = class DuckCommand extends Command {
	constructor(...args) {
		super(...args, {
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows a random duck'
		});
	}

	async run(msg) {
		const { body: { url } } = await get('https://api.random-d.uk/random');
		return msg.send(new this.client.methods.Embed().setImage(url));
	}
};
