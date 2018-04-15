const { Command } = require('klasa');

module.exports = class PurgeCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['clear'],
			permLevel: 4,
			usage: '<amount:integer> [member:member]',
			usageDelim: ' ',
			botPerms: ['MANAGE_MESSAGES'],
			description: 'Clears and amount of messages (max 100!) if a member is provided only clears from this person'
		});
	}

	async run(msg, [amount, member]) {
		try {
			let deleted;
			if (member) {
				const messages = await msg.channel.messages.fetch({ limit: 50 });
				deleted = await msg.channel.bulkDelete(messages.filter(message => message.author.id === member.id));
			} else {
				deleted = await msg.channel.bulkDelete(amount);
			}
			const message = await msg.send(`i've deleted ${deleted.size} Messages ${member ? `from ${member.displayName}` : ``}`);
			await message.delete(10000);
		} catch (error) {
			if (error.message === 'Unknown Message') throw error;
			const message = await msg.send('I may only delete Messages that are not older than 14 Days! thats is a Limit from Discord');
			await message.delete(10000);
		}
	}
};
