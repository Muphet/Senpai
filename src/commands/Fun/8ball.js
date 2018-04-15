const { Command } = require('klasa');

module.exports = class EightBallCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<question:str>',
			description: 'Answers a yes/no question'
		});
		this.options = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', "Don't count on it", 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
	}

	async run(msg, [...question]) {
		await msg.send(`You asked me \`${question}\` and my answer is **${this.options[Math.floor(Math.random() * this.options.length)]}**.`);
	}
};
