const { Command } = require('klasa');
const { join } = require('path');
const { UsageError, EconomyError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class GiveCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['pay'],
			usage: '<user:user> <amount_number:int{1}|amount_text:amount>',
			usageDelim: ' ',
			description: 'give another user some of your money'
		});
	}

	async run(msg, [user, amount]) {
		if (msg.author.configs.currency < amount) throw new EconomyError('You dont have that much money!');
		if (user.bot) throw new UsageError('You cannot give bots money!');
		if (msg.author.id === user.id) throw new UsageError('You cannot give yourself money!');
		await msg.author.configs.update('currency', msg.author.configs.currency - amount);
		await user.configs.update('currency', user.configs.currency + amount);
		return msg.send(`You successfully gave ${user.username} ${amount}¥`);
	}
};
