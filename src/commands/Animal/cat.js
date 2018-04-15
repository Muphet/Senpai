const { Command } = require('klasa');


module.exports = class CatCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['kitty', 'kitten'],
			botPerms: ['EMBED_MESSAGE'],
			description: 'Catto'
		});
	}

	async run(msg) {
		const { url } = await this.wolkeClient.getRandom({ type: `animal_${this.name}`, hidden: false, nsfw: false });
		return msg.send(new this.client.methods.Embed().setImage(url));
	}
};
