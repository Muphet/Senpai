module.exports = class GatewayInit {
	constructor() {
		throw new Error('This class is abstracted and can\'t ne instanceiated');
	}

	static async init(client) {
		await this.createCasesGateaway(client);
		return this.createStarboardGateaway(client);
	}

	static createStarboardGateaway(client) {
		return client.gateways.register('starboard', {
			guild: { type: 'guild' },
			starCount: { type: 'integer' },
			author: { type: 'User' },
			originalMessage: { type: 'message' }
		});
	}

	static createCasesGateaway(client) {
		return client.gateways.register('cases', {
			action: { type: 'string' },
			guild: { type: 'guild' },
			target: { type: 'string' },
			moderator: { type: 'member' },
			reason: {
				type: 'string',
				default: null
			},
			caseNumber: { type: 'integer' },
			message: {
				type: 'string',
				default: null
			}
		});
	}
};
