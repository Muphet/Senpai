const { Command } = require('klasa');

module.exports = class CryCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			aliases: ['sob'],
			usage: '[member:member]',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Start Ctying or cry on someones shoulder'
		});
	}

	async run(msg, [member]) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(
			new this.client.methods.Embed()
				.setDescription(member ? `${msg.member} cried on ${member} shoulder` : `${msg.member} started to crying`)
				.setImage(url)
		);
	}
};
