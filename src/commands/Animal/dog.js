const { Command } = require('klasa');


module.exports = class DoggoCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['doggo', 'pupper', 'puppy', 'pup'],
			botPerms: ['EMBED_MESSAGE'],
			description: 'Doggo'
		});
	}

	async run(msg) {
		const { url } = await this.wolkeClient.getRandom({ type: `animal_${this.name}`, hidden: false, nsfw: false });
		return msg.send(new this.client.methods.Embed().setImage(url));
	}
};
