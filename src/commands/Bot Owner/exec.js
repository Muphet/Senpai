const { Command, Stopwatch } = require('klasa');

module.exports = class EvalCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ex'],
			permLevel: 10,
			guarded: true,
			description: 'Executes code inside a Shell',
			usage: '<code:str>'
		});
	}

	async run(msg, [...code]) {
		const stopwatch = new Stopwatch().start();
		const result = await this.client.methods.util.exec(code.join(' '), { timeout: 30000 })
			.catch(error => ({ stdout: null, stderr: error && error.message ? error.message : error }));
		stopwatch.stop();
		const output = result.stdout ? `**\`OUTPUT\`**\n\`\`\`prolog\n${result.stdout}\n\`\`\`` : '';
		const outerr = result.stderr ? `**\`ERROR\`**\n\`\`\`prolog\n${result.stderr}\n\`\`\`` : '';

		return msg.send([output, outerr].join('\n'));
	}
};
