const { Command } = require('klasa');

module.exports = class AwooCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			botPerms: ['EMBED_MESSAGE'],
			description: 'Awooo!'
		});
	}

	async run(msg) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(new this.client.methods.Embed().setImage(url));
	}
};
