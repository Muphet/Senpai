const { Command } = require('klasa');


module.exports = class StareCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			botPerms: ['EMBED_MESSAGE'],
			usage: '[member:member]',
			description: '*Stare*'
		});
	}

	async run(msg, [member]) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(
			new this.client.methods.Embed()
				.setDescription(member ? `${msg.member} stared at ${member}` : `${msg.member} started to stare`)
				.setImage(url)
		);
	}
};
