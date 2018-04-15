const { Command, RichMenu } = require('klasa');
const { get } = require('snekfetch');

module.exports = class MangaCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['mangu'],
			usage: '<manga_name:str>',
			botPerms: ['EMBED_MESSAGE'],
			description: 'Shows information about an specific manga'
		});
	}

	async run(msg, [...request]) {
		const { text } = await get(`https://kitsu.io/api/edge/manga?${encodeURIComponent(`filter[text]=${request}`)}`);
		const { data } = JSON.parse(text);
		if (!data || !data.length) return msg.send('No Manga with this name found!');
		const menu = new RichMenu(new this.client.methods.Embed()
			.setColor(0x673AB7)
			.setAuthor(msg.author.username, msg.author.displayAvatarURL())
			.setTitle('Choose a Manga.')
			.setDescription('Use number reactions to select a Manga.'));
		for (let index = 0; index < 5; index++) {
			menu.addOption(this._createTitle(index, data), data[index].attributes.subtype);
		}
		const collector = await menu.run(await msg.send('*Fetching data from the Kitsu API*'));

		const choice = await collector.selection;
		if (choice === null) {
			return collector.message.delete();
		}

		const anime = data[choice];

		const embed = new this.client.methods.Embed()
			.setTitle(anime.attributes.titles.en || anime.attributes.titles.en_jp || anime.attributes.titles.ja_jp)
			.setDescription(anime.attributes.synopsis)
			.addField('Type', anime.attributes.subtype, true)
			.addField('Age Rating', anime.attributes.ageRating ? anime.attributes.ageRating : 'Not Rated', true)
			.addField('Chatpters', anime.attributes.chapterCount, true)
			.addField('Volumes', anime.attributes.volumeCount, true)
			.addField('Average Rating', anime.attributes.averageRating, true)
			.addField('Popularity Rank', anime.attributes.popularityRank, true)
			.addField('Airing Date', `${anime.attributes.startDate || 'Not Aired'} - ${anime.attributes.endDate || 'Not Finished'}`, true)
			.addField('Status', this.firstCharUpper(anime.attributes.status), true)
			.setThumbnail(anime.attributes.posterImage.original)
			.setColor('RANDOM');

		return msg.sendEmbed(embed);
	}
};
