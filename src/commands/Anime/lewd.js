const { Command } = require('klasa');


module.exports = class LewdCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			usage: '[member:member]',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Lewd *blushes*'
		});
	}

	async run(msg, [member]) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(
			new this.client.methods.Embed()
				.setDescription(member ? `${msg.member} thinks lewd about ${member}` : `${msg.member} thinks lewd`)
				.setImage(url)
		);
	}
};
