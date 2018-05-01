const { Command, RichDisplay } = require('klasa');

module.exports = class LeaderboardCommand extends Command {
	constructor(...args) {
		super(...args, { description: 'Global leaderboard for all users amount of ¥' });
	}

	async run(msg) {
		const users = await this.client.providers.default.getAll('users');

		const display = new RichDisplay(new this.client.methods.Embed()
			.setColor(0xFFA500)
			.setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
			.setTitle(`Global Leaderboard`)
			.setDescription('Scroll between the pages using the provided reaction emotes.')
		);

		const userChunkArray = this.getChunk(users, 5);

		let index = 0;
		for (const userChunk of userChunkArray) {
			display.addPage(template => {
				for (const userObj of userChunk) {
					index++;
					const user = this.client.users.get(userObj.id);
					if (user) template.addField(`#${index} ${user.tag}`, userObj.currency.toString());
				}
				return template;
			});
		}

		return display.run(await msg.send('Loading the leaderboard...'), { filter: (reaction, user) => user.id === msg.author.id });
	}
};
