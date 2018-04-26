const { Command } = require('klasa');


module.exports = class InviteCommand extends Command {
	constructor(...args) {
		super(...args, {
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows my Invite Link.'
		});
	}

	async run(msg) {
		const embed = new this.client.methods.Embed()
			.addField('Invite Link', `[Click Me](${this.client.config.constants.inviteURL})`)
			.setColor(0x80ff00)
			.setTimestamp();
		await msg.send(embed);
	}
};
