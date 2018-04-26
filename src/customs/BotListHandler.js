const { Piece } = require('klasa');
const { post } = require('snekfetch');

module.exports = class BotListHandler extends Piece {
	constructor(...args) {
		super(...args, {
			name: 'BotListHandler',
			enabled: true
		});
		this.interval = this.client.setInterval(this.updateStats.bind(this), 9e5);
	}

	async updateStats() {
		try {
			await post(`https://discordbots.org/api/bots/${this.client.user.id}/stats`)
				.set('Authorization', this.client.config.tokens.dBots)
				.send({ shard_id: this.client.shard.id, shard_count: this.client.shard.count, server_count: this.client.guilds.size }); // eslint-disable-line camelcase
			await post(`https://bots.discord.pw/api/bots/${this.client.user.id}/stats`)
				.set('Authorization', this.client.config.tokens.discordBots)
				.send({ shard_id: this.client.shard.id, shard_count: this.client.shard.count, server_count: this.client.guilds.size }); // eslint-disable-line camelcase
		} catch (error) {
			this.client.console.error(error);
		}
	}
};

