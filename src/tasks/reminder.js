const { Task } = require('klasa');

module.exports = class extends Task {
	constructor(...args) {
		super(...args, { name: 'reminder', enabled: true });
	}

	run({ channel, user, reason, isDM, creationDate, origin }) {
		let _channel;
		if (isDM) _channel = this.client.users.get(channel);
		else _channel = this.client.channels.get(channel);
		return _channel.send(
			this.client.users.get(user).toString(),
			new this.client.methods.Embed()
				.setTitle('You wanted to be reminded of:')
				.setDescription(reason)
				.addField('From Channel/Server', origin)
				.setFooter('Reminder created on')
				.setTimestamp(new Date(creationDate))
				.setColor('#ff3300')
		);
	}
};
