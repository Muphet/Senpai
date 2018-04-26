const { Command } = require('klasa');
const { GuildMember } = require('discord.js');
const seedrandom = require('seedrandom');

module.exports = class RateWaifuCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			usage: '<user:member|character:str>',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Rates your waifu.'
		});
	}

	run(msg, [waifu]) {
		if (waifu instanceof GuildMember) {
			const rng = seedrandom(`${msg.author.id}${waifu.id}`);
			const random = Math.floor(rng() * 10);
			const embed = new this.client.methods.Embed()
				.setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
				.addField(`I Rate your waifu ${waifu.displayName}`, `${random}/10`)
				.setColor(0x80ff00)
				.setTimestamp();
			return msg.send(embed);
		} else {
			const rng = seedrandom(`${msg.author.id}${waifu}`);
			const random = Math.floor(rng() * 10);
			const embed = new this.client.methods.Embed()
				.setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
				.addField(`I Rate your waifu ${waifu}`, `${random}/10`)
				.setColor(0x80ff00)
				.setTimestamp();
			return msg.send(embed);
		}
	}
};
