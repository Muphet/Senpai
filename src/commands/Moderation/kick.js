const { Command } = require('klasa');

module.exports = class KickCommand extends Command {
	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			permLevel: 4,
			usage: '<member_to_kick:member> [reason:string]',
			usageDelim: ' ',
			botPerms: ['KICK_MEMBERS'],
			description: 'Kick an User by mention or ID'
		});
	}

	async run(msg, [member, ...reason]) {
		const message = await msg.send(`trying to kick ${member.user.tag}`);
		await member.kick({ reason: reason.join(' ') });
		await message.edit(`successfully kicked ${member.user.tag}`);
	}
};
