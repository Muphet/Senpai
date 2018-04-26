const { Command } = require('klasa');


module.exports = class WagCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			botPerms: ['EMBED_MESSAGE'],
			description: 'Don\'t wag your finger at me'
		});
	}

	async run(msg) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false });
		return msg.send(new this.client.methods.Embed().setImage(url));
	}
};
