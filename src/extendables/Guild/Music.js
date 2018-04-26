const { Extendable } = require('klasa');
const { join } = require('path');
const Music = require(join(__dirname, '..', '..', 'structures', 'Music.js'));

module.exports = class extends Extendable {
	constructor(...args) {
		super(...args, {
			appliesTo: ['Guild'],
			name: 'music',
			enabled: true,
			klasa: false
		});
	}

	get extend() {
		if (!this._music) this._music = new Music(this.client, this.id);
		return this._music;
	}
};

