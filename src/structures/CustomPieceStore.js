const { Store, Piece } = require('klasa');

module.exports = class CustomPieceStore extends Store {
	constructor(...args) {
		super(...args,
			'customs',
			Piece
		);
	}
};
