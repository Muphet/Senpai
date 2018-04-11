const { Piece } = require('klasa');

module.exports = class CacheSync extends Piece {
	constructor(...args) {
		super(...args, {
			name: 'CacheSync',
			enabled: true
		});
	}
};
