const { Command, RichDisplay } = require('klasa');
const { all } = require('relevant-urban');

module.exports = class UrbanCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<phrase:str>',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Search for a word on the urban dictonary'
		});
	}

	async run(msg, [...query]) {
		try {
			const responses = await all(query.join(' '));
			const display = new RichDisplay(new this.client.methods.Embed()
				.setColor(0x673AB7)
				.setAuthor(this.client.user.name, this.client.user.avatarURL())
				.setTitle('Urban Dictonary results')
				.setDescription('Scroll between the images using the provided reaction emotes.')
			);

			for (let i = 0; i < responses.length; i++) {
				display.addPage(template => template.setAuthor(responses[i].author)
					.setTitle(responses[i].word)
					.setDescription(responses[i].definition)
					.addField('Example:', responses[i].example)
					.setFooter(`${responses[i].thumbsUp}👍 | ${responses[i].thumbsDown}👎`));
			}

			return display.run(await msg.send('Getting Urban definitions...'));
		} catch (error) {
			return msg.send('Sorry but i didn\'t find this phrase on the urban dictonary!');
		}
	}
};
