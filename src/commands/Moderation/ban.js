const { Command } = require('klasa');

module.exports = class BanCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['banne', 'bean', 'hammer'],
			permLevel: 5,
			usage: '<member_to_ban:member> [reason:string]',
			usageDelim: ' ',
			botPerms: ['BAN_MEMBERS'],
			description: 'Bans an User by mention or ID'
		});
	}

	async run(msg, [member, ...reason]) {
		const message = await msg.send(`trying to ban ${member.user.tag}`);
		await member.ban({
			reason: reason.join(' '),
			days: 7
		});
		return message.edit(`successfully banned ${member.user.tag}`);
	}
};
