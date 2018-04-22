const { Command } = require('klasa');
const { SlotMachine, SlotSymbol } = require('slot-machine');
const { join } = require('path');
const { EconomyError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));
module.exports = class SlotsCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'play slots with economy!',
			usage: '<amount:int{0}|amount:amount>'
		});
		this.slotSymbols = [
			new SlotSymbol('money', {
				display: '💰',
				points: 100,
				weight: 75
			}),
			new SlotSymbol('cherry', {
				display: '🍒',
				points: 50,
				weight: 100
			}),
			new SlotSymbol('wild', {
				display: '❔',
				points: 30,
				weight: 50,
				wildcard: true
			}),
			new SlotSymbol('seven', {
				display: ':seven:',
				points: 75,
				weight: 100
			}),
			new SlotSymbol('dice', {
				display: '🎲',
				points: 125,
				weight: 50
			})
		];
		this.slotMachine = new SlotMachine(5, this.slotSymbols);
	}

	async run(msg, [amount]) {
		let { currency } = msg.author.configs;
		if (amount <= 0) throw new EconomyError('Value cant be under or equal to 0');
		if (amount > msg.author.configs.currency) throw new EconomyError('You dont have that much money!');
		const result = this._runSlots();
		const resultString = result.visualize();
		const { winCount, totalPoints } = result;
		let message;
		if (!winCount) {
			message = `\n\n**----------Slots---------**\n${resultString}\n**-------------------------**\n\n no rows won, you lost ${amount}¥`;
			currency -= amount;
		} else {
			const multiplier = totalPoints > 100 ? totalPoints / 100 : 1.25;
			const wonMoney = Math.round(amount * multiplier);
			message = `\n\n**----------Slots---------**\n${resultString}\n**-------------------------**\n\n ${winCount} rows won, your used money got multiplied by ${multiplier} and you got ${wonMoney}¥ back.`;
			currency += wonMoney;
		}
		await msg.author.configs.update('currency', currency);
		return msg.send(message);
	}

	_runSlots() {
		return this.slotMachine.play();
	}
};
