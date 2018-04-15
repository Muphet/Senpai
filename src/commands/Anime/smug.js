const { Command } = require('klasa');


module.exports = class SmugCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			aliases: ['smirk'],
			usage: '[member:member]',
			botPerms: ['EMBED_MESSAGE'],
			description: '*Smirk*'
		});
	}

	async run(msg, [member]) {
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(
			new this.client.methods.Embed()
				.setDescription(member ? `${msg.member} smugged at ${member}` : `${msg.member} smugged`)
				.setImage(url)
		);
	}
};
