const { Event } = require('klasa');

module.exports = class ConfigUpdateEntryEvent extends Event {
	run(oldConf, newConf) {
		this.client.console.debug('ConfigUpdateEntryEvent emitted');
		if (!this.client.shard) return;
		if (newConf.gateway.type === 'users') {
			this.client.console.debug('started user if-statement');
			this.client.shard.broadcastEval(`
				this.console.debug('started broadcastEval');
				if (this.shard.id !== ${this.client.shard.id}) {
					this.console.debug('started if-statement inside broadcastEval');
					const user = this.users.get('${newConf.id}')
					if (user) {
						user.configs.sync();
						this.console.debug('calling sync method on user');
					}
				}
			`);
		} else if (newConf.gateway.type === 'clientStorage') {
			this.client.shard.broadcastEval(`
				if (this.shard.id !== ${this.client.shard.id}) {
					this.configs.sync();
				}
			`);
		}
	}

	init() {
		if (!this.client.shard) this.disable();
	}
};
