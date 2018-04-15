const { Event } = require('klasa');
const { join } = require('path');
const { APIError, MusicError, PermissionError, UsageError } = require(join(__dirname, '..', 'util', 'CustomErrors.js'));

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			name: 'commandError',
			enabled: true,
			event: 'commandError',
			once: false
		});
		this.errorClasses = [APIError, MusicError, PermissionError, UsageError];
	}

	run(msg, command, params, error) {
		if (this.errorClasses.some(errorclass => error instanceof errorclass)) {
			return msg.send(error.message);
		} else if (error instanceof Error) {
			this.client.emit('wtf', `[COMMAND] ${join(command.dir, ...command.file)}\n${error.stack || error}`);
			const { owner } = this.client;
			msg.send(
				[`An error occurred while running the command: \`${error.name}: ${error.message}\``,
					'You shouldn\'t ever receive an error like this.',
					`Please contact ${owner.tag} in this server: ${this.client.config.constants.supportServerLink}`].join('\n'), { reply: msg.member || msg.author });
			return owner.send(`Error: \`\`\`js\n${error.stack}\`\`\` has occured`);
		} else {
			return msg.send(error);
		}
	}
};
