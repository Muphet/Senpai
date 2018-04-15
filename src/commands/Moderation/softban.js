const { Command } = require('klasa');

module.exports = class SoftBanCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['banne', 'bean', 'hammer'],
			permLevel: 5,
			usage: '<member_to_ban:member> [reason:string]',
			usageDelim: ' ',
			botPerms: ['BAN_MEMBERS'],
			description: 'Bans a member and then unbans him that causes the last 7 days of messages get deleted.'
		});
	}

	async run(msg, [member, ...reason]) {
		const message = await msg.channel.send(`trying to ban ${member.user.tag}`);
		const banned = await member.ban({
			reason: reason.join(' '),
			days: 7
		});
		const newMessage = await message.edit(`successfully banned ${member.user.tag} Awaiting unban ..`);
		const unbanned = await msg.guild.members.unban(banned.user, reason);
		await newMessage.edit(`successfully softbanned ${unbanned.tag}`);
	}
};
