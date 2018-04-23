const { Command } = require('klasa');
const { join } = require('path');
const { EconomyError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class CoinflipCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<amount_number:int{1}|amount_text:amount>',
			aliases: ['bet', 'coin', 'flip'],
			description: 'a 50/50 chance to double your bet, go big or go home!'
		});
	}

	async run(msg, [amount]) {
		let { currency } = msg.author.configs;
		if (amount > msg.author.configs.currency) throw new EconomyError('amount can not be more than your currency.');
		const random = Math.random();
		let message;
		if (random > 0.5) {
			currency += amount;
			message = `You won the coinflip and ${amount}¥`;
		} else {
			currency -= amount;
			message = `You lost the coinflip and ${amount}¥`;
		}
		await msg.author.configs.update('currency', currency);
		return msg.send(message);
	}
};
