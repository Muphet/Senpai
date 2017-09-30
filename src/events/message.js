const Events = require('../structures/new/Event.js');
const { messageUpdate } = require('../util/economy.js');

class MessageEvent extends Events {
	constructor(client) {
		super(client);
		this.name = 'message';
	}

	async run(msg) {
		const { client } = this;
		if (msg.author.bot) return;
		const blacklisted = await msg.author.isBlacklisted(client);
		if (blacklisted) return;
		if (!msg.guild) return;
		messageUpdate(msg.member);
		let guildConfig = await msg.guild.getConfig(client);
		if (!guildConfig) {
			await msg.guild.createConfig(client);
			guildConfig = await msg.guild.getConfig(client);
		}
		if (guildConfig.prefix === 'None') guildConfig.prefix = undefined;
		const prefix = guildConfig.prefix || client.config.prefix;
		if (!msg.content.startsWith(prefix)) return;
		const params = this.createParams(msg);
		const command = this.getCommand(msg, prefix);
		let cmd;
		if (client.commands.has(command)) {
			cmd = client.commands.get(command);
		} else if (client.aliases.has(command)) {
			cmd = client.commands.get(client.aliases.get(command));
		}
		if (cmd) {
			try {
				this.client.emit('commandRun', this, msg);
				await cmd.run(msg, params, prefix);
			} catch (error) {
				this.client.emit('commandError', error, this, msg);
				const Owner = this.client.users.get(this.client.config.ownerID);
				const invite = this.client.config.supportServerLink;
				msg.reply(`An error occurred while running the command: \`${error.name}: ${error.message}\`
You shouldn't ever receive an error like this.
Please contact ${Owner.tag}${invite ? ` in this server: ${invite}` : '.'}`);
			}
		}
	}

	createParams(msg) {
		const params = msg.content.split(' ').slice(1);
		return params;
	}

	getCommand(msg, prefix) {
		const command = msg.content.split(' ')[0].slice(prefix.length).toLowerCase();
		return command;
	}

	inviteLink(link) {
		if (/(https:\/\/|http:\/\/)(discord.me\/)[a-z]*/.test(link) || /(https:\/\/|http:\/\/)(discord)(app\.com\/invite|\.gg)\/\w{5,7}/.test(link)) {
			return true;
		} else {
			return false;
		}
	}
}

module.exports = MessageEvent;
