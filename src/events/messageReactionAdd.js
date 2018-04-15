const { Event } = require('klasa');

module.exports = class MessageReactionAddEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'messageReactionAdd',
			enabled: true,
			event: 'messageReactionAdd',
			once: false
		});
	}

	async run(messageReaction, user) {
		let { message, count: reactionCount } = messageReaction;
		const { guild, author } = message;
		if (user.bot || messageReaction.emoji.name !== '⭐' || author.id === user.id || !guild) return;
		let { starboard } = guild.configs.channels;
		const { count } = guild.configs.starboard;
		if (!starboard) return;
		if (message.channel.id === starboard) return;
		starboard = guild.channels.get(starboard);
		let entry = this.client.gateways.starboard.cache.get(message.id);
		await messageReaction.users.fetch();
		if (messageReaction.users.has(message.author.id)) reactionCount -= 1;
		if (reactionCount < count) return;
		let sentMessage;
		if (entry) {
			sentMessage = await this.editStarboardMessage({ reactionCount, starboard });
		} else {
			sentMessage = await this.createStarboardMessage({ message, reactionCount, starboard });
		}
		entry = entry || this.client.gateways.starboard.insertEntry(message.id);
		await entry.update({ guild: message.guild, starCount: reactionCount, author, sentMessage: sentMessage.id });
	}

	createStarboardMessage({ message, reactionCount, starboard }) {
		const embed = new this.client.methods.Embed()
			.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
			.setThumbnail(message.author.displayAvatarURL)
			.addField(`ID:`, `${message.id}`, true)
			.addField('Channel', `${message.channel}`, true)
			.setTimestamp()
			.setFooter(`${reactionCount}⭐`)
			.setColor(0x80ff00);
		if (message.content) {
			embed.addField(`Message:`, `${message.content}`, true);
			const matches = message.content.match(/(http:\/\/|https:\/\/)([a-z, ., /, \d, -]+)(\.(gif|jpg|jpeg|tiff|png))/gi);
			if (matches) embed.setImage(matches[0]);
		}
		if (message.attachments.size === 1) {
			if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(message.attachments.first().name)) embed.setImage(`${message.attachments.first().url}`);
		}
		return starboard.send(embed);
	}

	async editStarboardMessage({ reactionCount, starboard, messageID }) {
		let message = await starboard.messages.fetch(messageID);
		message.embeds[0].setFooter(`${reactionCount}⭐`);
		return message.edit(message.embeds[0]);
	}
};
