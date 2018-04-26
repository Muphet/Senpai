const { Command } = require('klasa');


module.exports = class ThinkingCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			botPerms: ['EMBED_MESSAGE'],
			usage: '[member:member]',
			description: 'Think thonk!'
		});
	}

	async run(msg, [member]) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(
			new this.client.methods.Embed()
				.setDescription(member ? `${msg.member} started thinking about ${member}` : `${msg.member} started to think`)
				.setImage(url)
		);
	}
};
