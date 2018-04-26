/* eslint no-throw-literal: 0 */
const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['SettingResolver'],
			enabled: true,
			name: 'starmessage',
			klasa: true
		});
	}

	/**
     * Resolves my custom type!
     * @param {*} data The data to resolve
     * @param {KlasaGuild} guild The guild to resolve for
     * @param {string} name The name of the key being resolved
     * @param {Object} [minMax={}] The minimum and maximum
     * @param {?number} minMax.min The minimum value
     * @param {?number} minMax.max The maximum value
     * @returns {Promise<*>}
     */
	async extend(data = {}) {
		if (typeof data !== 'object') throw `Wrong Type for data, expected object got ${typeof data}`;

		const { starCount, originalMessage, sentMessage } = data;

		if (typeof starCount !== 'number') throw `Wrong Type for data.action, expected number got ${typeof starCount}`;
		if (typeof originalMessage !== 'string') throw `Wrong Type for data.caseNumber, expected string got ${typeof originalMessage}`;
		if (typeof sentMessage !== 'string') throw `Wrong Type for data.target, expected string got ${typeof sentMessage}`;

		return data;
	}
};
