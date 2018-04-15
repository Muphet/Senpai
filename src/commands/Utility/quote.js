const { Command } = require('klasa');

module.exports = class PingCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['pong'],
			usage: '<message:str> [channel:channel]',
			usageDelim: ' ',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Quote a message from the chat'
		});
	}

	async run(msg, [messageID, channel = msg.channel]) {
		try {
			const message = await channel.messages.fetch(messageID);
			const embed = new this.client.methods.Embed()
				.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
				.addField('ID:', message.id, true)
				.addField('Message:', message.content, true)
				.addField('Channel', message.channel.toString(), true)
				.setTimestamp(message.createdAt)
				.setColor(0x80ff00);
			return msg.send(embed);
		} catch (error) {
			return msg.send(`No Message with this id in channel ${channel} found`);
		}
	}
};
