const { Command, RichDisplay } = require('klasa');

module.exports = class QueueCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			cooldown: 5,
			aliases: ['playlist'],
			description: 'Shows the currently Song Queue'
		});
	}

	async run(msg) {
		const { queue, paused, playing } = msg.guild.music;
		let time = queue.map(song => song.length).reduce((a, b) => a + b);
		const chunks = this.getQueueChunk(queue);
		time = this.format(time / 1000);
		const menu = new RichDisplay(
			new this.client.methods.Embed()
				.setColor('RANDOM')
				.setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
				.setTitle(`Music Queue for ${msg.guild.name}Queue length: ${time}`)
				.addField(`Queue length`, time, true)
				.addField('Playing?', playing ? 'Yes' : 'No', true)
				.addField('Paused?', paused ? 'Yes' : 'No', true)
		);
		for (const page of chunks) {
			menu.addPage(template => {
				let text = '';
				for (const song of page) {
					text += `[${song.title}](${song.url}) by ${song.author} - ${song.userMention} [${this.format(song.length / 1000)}]\n\n`;
				}
				return template
					.setDescription(text);
			});
		}
		return menu.run(await msg.send('Loading Queue...'), { filter: (reaction, user) => user.id === msg.author.id });
	}

	getQueueChunk(queue) {
		const splitted = [];
		for (var i = 0; i < queue.length; i += 10) {
			splitted.push(queue.slice(i, i + 10));
		}
		return splitted;
	}
};
