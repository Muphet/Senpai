const { Command } = require('klasa');


module.exports = class GreetCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			usage: '[member:member]',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Greet someone or get greeted'
		});
	}

	async run(msg, [member]) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(new this.client.methods.Embed()
			.setDescription(member ? `${msg.member} Welcomed ${member}` : `${msg.member} got greeted`)
			.setImage(url)
		);
	}
};
