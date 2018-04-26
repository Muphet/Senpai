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
		const { guild, id } = message;
		if (user.bot || messageReaction.emoji.name !== '⭐' || message.author.id === user.id || !guild) return;
		let { starboard } = guild.configs.channels;
		starboard = guild.channels.get(starboard);
		const { count } = guild.configs.starboard;
		await messageReaction.users.fetch();
		if (messageReaction.users.has(message.author.id)) reactionCount -= 1;
		const starArray = guild.configs.storage.starboard;
		let entry = starArray.find(obj => obj.originalMessage === id);
		if (!entry) return;
		if (reactionCount < count) {
			await this.deleteStarboardMessage({ messageID: entry.sentMessage, starboard });
			await guild.configs.update('storage.starboard', entry, { action: 'delete' });
		} else {
			await this.client.events.get('messageReactionAdd').editStarboardMessage({ reactionCount, starboard, messageID: entry.sentMessage });
			await guild.configs.update('storage.starboard', entry);
		}
	}

	async deleteStarboardMessage({ messageID, starboard }) {
		let message = await starboard.messages.fetch(messageID);
		return message.delete();
	}
};
