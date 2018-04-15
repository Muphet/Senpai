const { Command } = require('klasa');
const { readFile } = require('fs-nextra');
const { find } = require('weather-js');
const { join } = require('path');
const { APIError } = require(join(__dirname, '..', '..', 'util', 'CustomErrors.js'));
const Canvas = require('canvas');

module.exports = class WeatherCommand extends Command {
	constructor(...args) {
		super(...args, {
			usage: '<location:str>',
			botPerms: ['ATTACH_FILES'],
			description: 'Shows a picture with the weather of the city you requested.'
		});
	}

	async run(msg, [...location]) {
		const [result] = await this.getWeather({ search: location, degreeType: 'C' });
		Canvas.registerFont(join(__dirname, '..', '..', 'materials', 'fonts', 'Roboto-Regular.ttf'), { family: 'Roboto' });
		const { Image } = Canvas;
		const canvas = Canvas.createCanvas(400, 180);
		const ctx = canvas.getContext('2d');
		let base = new Image();
		let humidity = new Image();
		let windspeed = new Image();
		base.src = await readFile(join(__dirname, '..', '..', 'materials', 'pictures', 'weather.png'));
		humidity.src = await readFile(join(__dirname, '..', '..', 'materials', 'icons', 'humidity.png'));
		windspeed.src = await readFile(join(__dirname, '..', '..', 'materials', 'icons', 'wind.png'));

		// Enviroment stuff
		ctx.drawImage(base, 0, 0, base.width, base.height);
		let fontColor = '#FFFFFF';
		ctx.scale(1, 1);
		ctx.patternQuality = 'billinear';
		ctx.filter = 'bilinear';
		ctx.antialias = 'subpixel';

		// City Name
		ctx.font = '20px Roboto';
		ctx.fillStyle = fontColor;
		ctx.fillText(result.location.name, 35, 50);

		// Temperature
		ctx.font = "48px 'Roboto'";
		ctx.fillStyle = fontColor;
		ctx.fillText(`${result.current.temperature}°C`, 35, 140);

		// Condition
		ctx.font = "16px 'Roboto'";
		ctx.textAlign = 'right';
		ctx.fillText(result.current.skytext, 370, 142);

		// Humidity Image
		ctx.drawImage(humidity, 358, 88);

		// Windspeed Image
		ctx.drawImage(windspeed, 358, 104, windspeed.width / 2, windspeed.height / 2);

		// Humidity & wind speed
		ctx.font = "16px 'Roboto'";
		ctx.fillText(`${result.current.humidity}%`, 353, 100);
		ctx.fillText(`${result.current.windspeed}`, 353, 121);

		// Send the Message
		return msg.send({
			files: [
				{
					attachment: canvas.toBuffer(),
					name: 'weather.png'
				}
			]
		});
	}

	getWeather(data) {
		return new Promise((resolve, reject) => {
			find(data, (err, result) => {
				if (err) return reject(err);
				if (!result || !result[0]) return reject(new APIError('No Location with this name found!'));
				return resolve(result);
			});
		});
	}
};
