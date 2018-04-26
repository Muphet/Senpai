/* eslint no-throw-literal: 0 */
const { Extendable } = require('klasa');

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['SettingResolver'],
			enabled: true,
			name: 'case',
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
		const { action, caseNumber, target, moderator, reason, messageID } = data;
		if (typeof action !== 'string') throw `Wrong Type for data.action, expected string got ${typeof action}`;
		if (typeof caseNumber !== 'number') throw `Wrong Type for data.caseNumber, expected number got ${typeof caseNumber}`;
		if (typeof target !== 'string') throw `Wrong Type for data.target, expected string got ${typeof target}`;
		if (typeof moderator !== 'string') throw `Wrong Type for data.moderator, expected string got ${typeof moderator}`;
		if (typeof reason !== 'string') throw `Wrong Type for data.reason, expected string got ${typeof reason}`;
		if (typeof messageID !== 'string') throw `Wrong Type for data.messageID, expected string got ${typeof messageID}`;
		return data;
	}
};
