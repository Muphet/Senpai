const { Command } = require('klasa');


module.exports = class UpvoteCommand extends Command {
	constructor(...args) {
		super(...args, {
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows where you can upvote Senpai and support me <3.'
		});
	}

	async run(msg) {
		const embed = new this.client.methods.Embed()
			.addField(`You can upvote Senpai on this Link`, `[Click me!](${this.client.config.constants.voteLink}) \n I appreciate that very much <3`)
			.setColor(0x80ff00)
			.setTimestamp();
		await msg.sendEmbed(embed);
	}
};
