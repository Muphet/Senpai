const { Command } = require('klasa');
const { searchImages } = require('pixabay-api');

module.exports = class BirdCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['birb'],
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows a random bird'
		});
	}

	async run(msg) {
		const result = await searchImages(this.client.config.token.pixabay, 'bird');
		const { webformatURL } = result.hits[Math.floor(Math.random() * result.hits.length)];
		return msg.send(new this.client.methods.Embed().setImage(webformatURL));
	}
};
