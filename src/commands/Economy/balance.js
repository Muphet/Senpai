const { Command } = require('klasa');

module.exports = class BalanceCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['money', 'cash', 'bal'],
			usage: '[user:user]',
			description: 'Shows your current money or of someone else!'
		});
	}

	run(msg, [user = msg.author]) {
		const daily = new Date().getTime() - new Date(user.configs.votedDate || Date.now()).getTime();
		const diff = 86400000 - daily;
		return msg.send(`${user.id === msg.author.id ? 'Your' : `${user.username}'s`} current balance is ${user.configs.currency}¥ ${msg.author.id === user.id ? `, You can use daily command ${diff < 86400000 ? `in ${this.format(diff / 1000)}` : '**now**'}` : ''}`);
	}
};
