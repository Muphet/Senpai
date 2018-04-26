const { Command, util: { isFunction } } = require('klasa');

module.exports = class HelpCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['commands'],
			description: 'Display help for a command.',
			usage: '[Command:cmd]',
			guarded: true
		});
	}

	async run(msg, [cmd]) {
		if (cmd) {
			const info = [
				`📘 | **Help Message** | \`${cmd.name}\``,
				`${isFunction(cmd.description) ? cmd.description(msg) : cmd.description}`,
				``,
				`🗒 | ***Command Usage***`,
				`\`${cmd.usage.fullUsage(msg)}\``,
				``,
				`🗒 | ***Extended Help***`,
				isFunction(cmd.extendedHelp) ? cmd.extendedHelp(msg) : cmd.extendedHelp].join('\n');
			return msg.send(info, { split: true });
		}
		const help = await this.buildHelp(msg);
		const catergorys = Object.keys(help);
		const helpMsg = [];

		helpMsg.push(`**📃 | Help Message \n\nUse** \`${msg.guildConfigs.prefix}help <commandname>\` **for more details about a command**\n`);

		for (let cat = 0; cat < catergorys.length; cat++) {
			helpMsg.push(`\u200b\n** *${catergorys[cat]}* Commands**\n\n`);
			helpMsg.push(help[catergorys[cat]].join(''));
			helpMsg.push('\n\u200b');
		}

		return msg.author.send(helpMsg.join(''), { split: { char: '\u200b' } })
			.then(() => { if (msg.channel.type !== 'dm') msg.send(msg.language.get('COMMAND_HELP_DM')); })
			.catch(() => { if (msg.channel.type !== 'dm') msg.send(msg.language.get('COMMAND_HELP_NODM')); });
	}

	async buildHelp(msg) {
		const help = {};
		const longest = [this.client.commands.keys()].reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map(command =>
			this.client.inhibitors.run(msg, command, true)
				.then(() => {
					if (!help.hasOwnProperty(command.category)) help[command.category] = [];
					const description = command.description
						? isFunction(command.description) ? command.description(msg) : command.description
						: 'No description provided';
					help[command.category].push(`${`**${msg.guildConfigs.prefix}${command.name}**`.padEnd(longest)} => \`${description}\`\n`);
				})
				.catch(() => {
					// Noop
				})
		));
		return help;
	}
};
