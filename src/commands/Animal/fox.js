const { Command } = require('klasa');
const { searchImages } = require('pixabay-api');

module.exports = class FoxCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['foxxo'],
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows a random fox'
		});
	}

	async run(msg) {
		const result = await searchImages(this.config.token.pixabay, 'fox');
		const { webformatURL } = result.hits[Math.floor(Math.random() * result.hits.length)];
		return msg.send(new this.client.methods.Embed().setImage(webformatURL));
	}
};
