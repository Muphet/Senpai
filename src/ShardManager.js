const { ShardingManager } = require('discord.js');
const { join } = require('path');
const { promisify } = require('util');
const { bottoken } = process.env;
const wait = promisify(setTimeout);
const Manager = new ShardingManager(join(__dirname, 'main.js'),
	{
		totalShards: 'auto',
		token: bottoken
	});
// Spawn shards
const spawn = async () => {
	await wait(5000);
	Manager.spawn(Manager.totalShards, 5500, false);
};
spawn();

Manager.on('shardCreate', shard => {
	console.log(`Shard spawned with ID ${shard.id}`);
});
