class Economy {
	constructor(client) {
		this.recentlyUpdated = [];
		this.client = client;
		this.db = client.db;
		this.databaseTable = 'money';
	}

	static bankUpdate(db) {
		setInterval(() => this._updatebank(db), 18000000);
	}

	messageUpdate(member) {
		if (!member) return;
		if (this.recentlyUpdated.includes(member.user.id)) return;
		this.recentlyUpdated.push(member.user.id);
		setTimeout(() => this._addMoney(member), 5000);
		setTimeout(() => this._removeIDFromArray(member), 30000);
	}

	async _addMoney(member) {
		let { cash, bank } = await member.getEconomy();
		cash += 5;
		await member.updateEconomy(cash, bank);
	}

	_removeIDFromArray(member) {
		this.recentlyUpdated.splice(this.recentlyUpdated.indexOf(member.id), 1);
	}

	static async _updatebank(db) {
		const values = await db.economy.findAll();
		values.map(value => value.bank * 1.01);
		const Promises = values.map(value => value.save());
		await Promise.all(Promises);
	}
}

module.exports = Economy;
