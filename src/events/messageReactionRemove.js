const { Event } = require('klasa');

module.exports = class MessageReactionRemoveEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'messageReactionRemove',
			enabled: true,
			event: 'messageReactionRemove',
			once: false
		});
	}

	async run(messageReaction, user) {
		let { message, count: reactionCount } = messageReaction;
		const { guild } = message;
		if (user.bot || messageReaction.emoji.name !== '⭐' || message.author.id === user.id || !guild) return;
		let { starboard } = guild.configs.channels;
		starboard = guild.channels.get(starboard);
		const { count } = guild.configs.starboard;
		await messageReaction.users.fetch();
		if (messageReaction.users.has(message.author.id)) reactionCount -= 1;
		const entry = this.client.gateways.starboard.cache.get(message.id);
		if (!entry) return;
		if (reactionCount < count) {
			await this.deleteStarboardMessage({ messageID: entry.sentMessage, starboard });
			await this.client.gateways.starboard.deleteEntry(entry.id);
		} else {
			await this.client.events.get('messageReactionAdd').editStarboardMessage({ reactionCount, starboard, messageID: entry.sentMessage });
			await entry.update({ guild: message.guild, starCount: reactionCount });
		}
	}

	async deleteStarboardMessage({ messageID, starboard }) {
		let message = await starboard.messages.fetch(messageID);
		return message.delete();
	}
};
