const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Command'],
			name: '_createTitle',
			enabled: true,
			klasa: true
		});
	}

	extend(index, data) {
		const enJPTitle = data[index].attributes.titles.en_jp ? data[index].attributes.titles.en_jp : '';
		const enTitle = data[index].attributes.titles.en ? `/${data[index].attributes.titles.en}` : '';
		const jpTitle = data[index].attributes.titles.ja_jp ? `/${data[index].attributes.titles.ja_jp}` : '';
		return `${enJPTitle}${enTitle}${jpTitle}`;
	}
};

