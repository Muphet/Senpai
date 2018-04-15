const { Command, version: klasaVersion } = require('klasa');
const { version } = require('discord.js');

module.exports = class InfoCommand extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 5,
			aliases: ['about'],
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows information about me and my creator.'
		});
	}

	async run(msg) {
		const { client } = this;
		const result = await client.shard.fetchClientValues('guilds.size');
		const result2 = await client.shard.fetchClientValues('users.size');
		const result3 = await client.shard.fetchClientValues('channels.size');
		const result4 = await client.shard.broadcastEval('this.guilds.filter(g => g.music.playing).size');
		const serverCount = result.reduce((prev, val) => prev + val, 0);
		const userCount = result2.reduce((prev, val) => prev + val, 0);
		const channelCount = result3.reduce((prev, val) => prev + val, 0);
		const musicCount = result4.reduce((prev, val) => prev + val, 0);
		const owner = client.users.get(client.owner.id);
		const embed = new this.client.methods.Embed()
			.setTitle(`Stats & Infos`)
			.setAuthor(owner.username, owner.displayAvatarURL(), 'http://yukine.ga/')
			.addField('Creator/Dev', 'Yukine', true)
			.addField('RAM usage:', `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`, true)
			.addField('Uptime', `${this.format(process.uptime())}`, true)
			.addField('Library', `Discord.js ${version}`, true)
			.addField('Framework:', `Klasa ${klasaVersion}`, true)
			.addField('Node.js Version', process.version, true)
			.addField('Total Servers:', serverCount, true)
			.addField('Total Users:', userCount, true)
			.addField('Total Channels:', channelCount, true)
			.addField('Bot Invite Link', `[Link](${client.constants.inviteURL})`, true)
			.addField('GitHub', '[Senpai Github Repo](https://github.com/Discord-Senpai/Senpai)', true)
			.addField('Support Server', `[Server](${client.constants.supportServerLink})`, true)
			.addField('Shards:', `${client.shard.id + 1}/${client.shard.count}`, true)
			.addField('Senpai Version:', this.client.version, true)
			.addField('Playing Music on:', musicCount, true)
			.setTimestamp()
			.setColor('DARK_GREEN');
		return msg.sendEmbed(embed);
	}

	async init() {
		this.client.constants.inviteURL = await this.client.generateInvite(['ADMINISTRATOR']);
	}
};
