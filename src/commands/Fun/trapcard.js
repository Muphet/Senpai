const { Command } = require('klasa');
const { readFile } = require('fs-nextra');
const { join } = require('path');
const { get } = require('snekfetch');
const Canvas = require('canvas');

module.exports = class TrapCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '[user:user]',
			botPerms: ['ATTACH_FILES'],
			description: 'Turn the tables with your ultimate Yu-Gi-Oh trap card!'
		});
	}

	async run(msg, [user = msg.author]) {
		const { Image } = Canvas;
		const canvas = Canvas.createCanvas(316, 480);
		const ctx = canvas.getContext('2d');
		let base = new Image();
		let userPicture = new Image();
		base.src = await readFile(join(__dirname, '..', '..', 'materials', 'pictures', 'trap.png'));
		const { body } = await get(user.displayAvatarURL({ format: 'png', size: 2048 }));
		userPicture.src = body;
		ctx.drawImage(base, 0, 0, base.width, base.height);
		ctx.rotate(-0.15);
		ctx.drawImage(userPicture, 20, 45, 124, 124);
		return msg.send({
			files: [{
				attachment: canvas.toBuffer(),
				name: 'trap.png'
			}]
		});
	}
};
