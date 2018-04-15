const { Command } = require('klasa');

module.exports = class GoogleCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<searchQuery:str>',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Searches for something on google'
		});
	}

	run(msg, [...searchQuery]) {
		return msg.send(`http://www.google.com/search?q=${encodeURIComponent(searchQuery.join(' '))}&safe=active`);
	}
};
