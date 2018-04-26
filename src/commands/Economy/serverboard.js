const { Command, RichDisplay } = require('klasa');

module.exports = class ServerboardCommand extends Command {
	constructor(...args) {
		super(...args, { description: 'local leaderboard for members amount of ¥ of this server' });
	}

	async run(msg) {
		const members = await msg.guild.members.fetch();
		const users = members.filter().map(mem => mem.user).sort((user1, user2) => user2.configs.currency - user1.configs.currency);

		const display = new RichDisplay(new this.client.methods.Embed()
			.setColor(0xFFA500)
			.setAuthor(msg.guild.name, msg.guild.iconURL())
			.setTitle(`Leaderboard for ${msg.guild.name}`)
			.setDescription('Scroll between the pages using the provided reaction emotes.')
		);

		const userChunkArray = this.getChunk(users, 5);
		let index = 0;
		for (const userChunk of userChunkArray) {
			display.addPage(template => {
				for (const user of userChunk) {
					index++;
					template.addField(`#${index} ${user.username}`, user.configs.currency.toString());
				}
				return template;
			});
		}

		return display.run(await msg.send('Loading the leaderboard...'), { filter: (reaction, user) => user.id === msg.author.id });
	}
};
