const { Command } = require('klasa');
const { join } = require('path');
const { get } = require('snekfetch');
const { UsageError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class DBLDaily extends Command {
	constructor(...args) {
		super(...args, { description: 'Gives you currency after you voted for Senpai on Discord Bot List on a daily base, 24h cooldown' });
	}

	async run(msg) {
		let difference = new Date().getTime() - new Date(msg.author.configs.votedDateDBL || Date.now()).getTime();
		difference = difference === 0 ? 86400000 : difference;
		const diff = 86400000 - difference;
		if (difference < 86400000) throw new UsageError(`You already claimed your DBLDaily income for today and can do that next time in ${this.format(diff / 1000)} !`);
		const { body: { voted } } = await get(`https://discordbots.org/api/bots/${this.client.user.id}/check`)
			.set('Authorization', this.client.config.tokens.dBots)
			.query('userId', msg.author.id);
		if (!voted) throw new UsageError(`You need to vote on Discord Bot List to use this command. You can do this here ${this.client.config.constants.voteLink}`);
		await msg.author.configs.update({ currency: msg.author.configs.currency + 500, votedDateDBL: new Date().getTime() });
		return msg.send(`You claimed your DBLDaily reward of 500¥, You can vote & claim it again in 24h`);
	}
};
