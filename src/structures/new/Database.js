const { databaseName, databasePW } = require('../../config/config.json');
const { prefix } = require('../../config/config.json');
const Sequelize = require('sequelize');

module.exports = class Database {
	constructor(name, log) {
		this.database = new Sequelize(name, databaseName, databasePW, {
			host: 'localhost',
			dialect: 'postgres',
			logging: log.debug.bind(log),
			operatorsAliases: false
		});

		this.serverconfig = this.database.define('serverconfig', {
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			disabledCommandCategories: {
				type: Sequelize.ARRAY({ type: Sequelize.STRING }), // eslint-disable-line new-cap
				defaultValue: [],
				allowNull: false
			},
			disabledCommands: {
				type: Sequelize.ARRAY({ type: Sequelize.STRING }), // eslint-disable-line new-cap
				defaultValue: [],
				allowNull: false
			},
			inviteLinkProtection: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			prefix: {
				type: Sequelize.ARRAY({ type: Sequelize.STRING }), // eslint-disable-line new-cap
				defaultValue: [prefix], // eslint-disable-line new-cap
				allowNull: false
			},
			modLogChannel: {
				type: Sequelize.STRING,
				defaultValue: null,
				allowNull: true
			},
			modRoles: {
				type: Sequelize.ARRAY({ type: Sequelize.STRING }), // eslint-disable-line new-cap
				defaultValue: [],
				allowNull: false
			},
			musicRoles: {
				type: Sequelize.ARRAY({ type: Sequelize.STRING }), // eslint-disable-line new-cap
				defaultValue: [],
				allowNull: false
			},
			musicLimited: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			starboardChannel: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
				allowNull: false
			},
			starcount: {
				type: Sequelize.INTEGER,
				defaultValue: 1,
				allowNull: false
			},
			welcomeEnabled: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			welcomeChannel: {
				type: Sequelize.STRING,
				defaultValue: null,
				allowNull: true
			},
			welcomeMessage: {
				type: Sequelize.TEXT,
				defaultValue: 'Welcome our new user {{user}} to this server! Enjoy your stay',
				allowNull: false
			}
		});

		this.cases = this.database.define('cases', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			guild: {
				type: Sequelize.STRING,
				allowNull: false
			},
			target: {
				type: Sequelize.STRING,
				allowNull: false
			},
			moderator: {
				type: Sequelize.STRING,
				allowNull: false
			},
			reason: {
				type: Sequelize.TEXT,
				allowNull: true
			},
			caseNumber: {
				type: Sequelize.STRING,
				allowNull: false
			},
			message: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});

		this.blacklist = this.database.define('blacklist', {
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			global: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			guilds: {
				type: Sequelize.ARRAY({ type: Sequelize.STRING }), // eslint-disable-line new-cap
				defaultValue: [],
				allowNull: false
			}
		});

		this.starboardMessages = this.database.define('starboardMessages', {
			id: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			starCount: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			author: {
				type: Sequelize.STRING,
				allowNull: false
			},
			message: {
				type: Sequelize.STRING,
				allowNull: false
			}
		});

		this.economy = this.database.define('economy', {
			id: {
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			user: {
				type: Sequelize.STRING,
				allowNull: false
			},
			guild: {
				type: Sequelize.STRING,
				allowNull: false
			},
			cash: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			},
			bank: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			}
		});

		this.history = this.database.define('history', {
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true
			},
			user: {
				type: Sequelize.STRING,
				allowNull: false
			},
			guild: {
				type: Sequelize.STRING,
				allowNull: false
			},
			warnCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			},
			muteCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			},
			kickCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			},
			banCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0,
				allowNull: false
			}
		});
	}
};
