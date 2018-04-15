const { Command } = require('klasa');
const { Api } = require('node-osu');
const { join } = require('path');
const { APIError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));

module.exports = class OsuCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<username:str>',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows information about an osu! player.'
		});
		this.osuClient = new Api(this.client.config.tokens.osu, {
			notFoundAsError: true,
			completeScores: false
		});
	}

	async run(msg, [...username]) {
		try {
			const { counts, id, name, pp, country, level, accuracyFormatted } = await this.osuClient.getUser({ u: username.join(' ') }); // eslint-disable-line id-length
			const embed = new this.client.methods.Embed()
				.setAuthor(msg.member.displayName, msg.author.displayAvatarURL())
				.setDescription(`**${name}/${id}**`)
				.addField('Song Counts', `SS: ${counts.SS}\nS :${counts.S}\nA: ${counts.A}`, true)
				.addField('Score Counts', `300: ${counts['300']}\n100: ${counts['100']}\n50: ${counts['50']}`, true)
				.addField('Plays Total', counts.plays, true)
				.addField('PP Score', Number(pp.raw).toFixed(2), true)
				.addField('Rank Global', pp.rank, true)
				.addField('Rank Country', pp.countryRank, true)
				.addField('Country', country, true)
				.addField('Level', level, true)
				.addField('Accuracy', accuracyFormatted, true)
				.setColor('RED');
			return msg.send(embed);
		} catch (error) {
			throw new APIError('No User with this Name Found!');
		}
	}
};
