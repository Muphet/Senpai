const { Command, RichMenu } = require('klasa');
const { get } = require('snekfetch');

module.exports = class AnimeCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['animu'],
			usage: '<anime_name:str>',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows information about an specific anime'
		});
	}

	async run(msg, [...request]) {
		const { text } = await get(`https://kitsu.io/api/edge/anime?${encodeURIComponent(`filter[text]=${request}`)}`);
		const { data } = JSON.parse(text);
		if (!data || !data.length) return msg.send('No Anime with this name found!');
		const menu = new RichMenu(new this.client.methods.Embed()
			.setColor(0x673AB7)
			.setAuthor(msg.author.username, msg.author.displayAvatarURL())
			.setTitle('Choose an Anime.')
			.setDescription('Use number reactions to select an Anime.'));
		for (let index = 0; index < 5; index++) {
			menu.addOption(this._createTitle(index, data), data[index].attributes.showType);
		}
		const collector = await menu.run(await msg.send('*Fetching data from the Kitsu API*'), { filter: (reaction, user) => user.id === msg.author.id });

		const choice = await collector.selection;
		if (choice === null) {
			return collector.message.delete();
		}

		const anime = data[choice];

		const embed = new this.client.methods.Embed()
			.setTitle(anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp)
			.setDescription(anime.attributes.synopsis)
			.addField('Type', anime.attributes.subtype, true)
			.addField('Age Rating', anime.attributes.ageRating ? anime.attributes.ageRating : 'Not rated yet', true)
			.addField('Episodes', anime.attributes.episodeCount, true)
			.addField('Episode Length', `${anime.attributes.episodeLength ? `${anime.attributes.episodeLength} minutes` : 'Not calculated yet'}`, true)
			.addField('Average Rating', anime.attributes.averageRating, true)
			.addField('Popularity Rank', anime.attributes.popularityRank, true)
			.addField('Airing Date', `${anime.attributes.startDate || 'Not Aired'} - ${anime.attributes.endDate || 'Not Finished'}`, true)
			.addField('Status', this.firstCharUpper(anime.attributes.status), true)
			.setThumbnail(anime.attributes.posterImage.original)
			.setColor('RANDOM');

		return msg.sendEmbed(embed);
	}
};
