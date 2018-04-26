const { Command, RichDisplay } = require('klasa');
const { all } = require('relevant-urban');

module.exports = class UrbanCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<phrase:str>',
			botPerms: ['EMBED_MESSAGE', 'MANAGE_MESSAGES'],
			description: 'Search for a word on the urban dictonary'
		});
	}

	async run(msg, [...query]) {
		try {
			const responses = await all(query.join(' '));
			const display = new RichDisplay(new this.client.methods.Embed().setColor(0x673AB7));

			for (let i = 0; i < responses.length; i++) {
				display.addPage(template => template.setAuthor(responses[i].author)
					.setTitle(responses[i].word)
					.setDescription(responses[i].definition)
					.addField('Example:', responses[i].example)
					.addField('Votes', `${responses[i].thumbsUp}👍 | ${responses[i].thumbsDown}👎`));
			}

			return display.run(await msg.send('Getting Urban definitions...'), { filter: (reaction, user) => user.id === msg.author.id });
		} catch (error) {
			return msg.send('Sorry but i didn\'t find this phrase on the urban dictonary!');
		}
	}
};
