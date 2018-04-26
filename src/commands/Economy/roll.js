const { Command } = require('klasa');
const { join } = require('path');
const { EconomyError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class RollCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['dice', 'cube'],
			usage: '<amount_number:int{1}|amount_text:amount>',
			description: 'Rolls a dice'
		});
	}

	async run(msg, [amount]) {
		if (amount > msg.author.configs.currency) throw new EconomyError(`Invalid Funds...`);
		const dice = Math.floor(Math.random() * 6);
		if (dice > 3) {
			await msg.author.configs.update('currency', msg.author.configs.currency + amount);
			return msg.send(`Good job you rolled ${dice}, You won!`);
		} else {
			await msg.author.configs.update('currency', msg.author.configs.currency - amount);
			return msg.send(`Oh... You rolled a ${dice}... You need a four or more...`);
		}
	}
};
