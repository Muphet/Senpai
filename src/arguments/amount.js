const { Argument } = require('klasa');

module.exports = class extends Argument {
	run(arg, possible, msg) {
		if (['all', 'everything', '-a'].includes(arg)) return msg.author.configs.currency;
		throw new Error('amount couldn\'t get resolved!');
	}
};
