const { Command } = require('klasa');


module.exports = class InsultCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			usage: '[member:member]',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Insult someone or get insulted'
		});
	}

	async run(msg, [member]) {
		if (!msg.channel.nsfw) return msg.send('This Command only work in channels marked as nsfw');
		const { url } = await this.wolkeClient.getRandom({ type: this.name, hidden: false, nsfw: false, filetype: 'gif' });
		return msg.send(new this.client.methods.Embed()
			.setDescription(member ? `${msg.member} insulted ${member}` : `${msg.member} got insulted`)
			.setImage(url)
		);
	}
};
