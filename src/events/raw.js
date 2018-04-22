const { Event } = require('klasa');

module.exports = class RawEvent extends Event {
	constructor(...args) {
		super(...args, {
			name: 'raw',
			enabled: true,
			event: 'raw',
			once: false
		});
		this.methods = { MESSAGE_REACTION_ADD: 'messageReactionAdd' };
		this.keys = Object.keys(this.methods);
	}

	async run(event) {
		const { d: data, t: type } = event; // eslint-disable-line id-length
		if (!this.keys.includes(type)) return;
		await this[this.methods[type]](data);
	}

	async messageReactionAdd(data) {
		const { client } = this;
		const channel = client.channels.get(data.channel_id);

		if (channel.messages.has(data.message_id)) return;

		const user = client.users.get(data.user_id);
		const message = await channel.messages.fetch(data.message_id);

		const reaction = message.reactions.get(data.emoji.id || data.emoji.name);

		client.emit('messageReactionAdd', reaction, user);
	}
};
