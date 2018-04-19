const { Command } = require('klasa');
const { join } = require('path');
const { UsageError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class DailyCommand extends Command {
	constructor(...args) {
		super(...args, { description: 'Gives you currency on a daily base, 24h cooldown' });
	}

	async run(msg) {
		let difference = new Date().getTime() - new Date(msg.author.configs.votedDate || Date.now()).getTime();
		difference = difference === 0 ? 86400000 : difference;
		const diff = 86400000 - difference;
		if (difference < 86400000) throw new UsageError(`You need to wait ${this.format(diff / 1000)} to use the daily Command again!`);
		const newCurrency = msg.author.configs.currency + 250;
		await msg.author.configs.update({ currency: newCurrency, votedDate: new Date().getTime() });
		return msg.send(`You claimed your daily reward of 250¥, You can come back and claim it again in 24h`);
	}
};
