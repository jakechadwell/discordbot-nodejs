// discord.js import
const Discord = require('discord.js');

const cron = require('cron');

// node-fetch for making HTTP requests
const fetch = require('node-fetch');

const keepAlive = require('./server');
// standard https for api call
const https = require('https');

const mySecret = process.env['API_TOKEN']

// const Database = require("@replit/database")
// const db = new Database()


// initialize client
const client = new Discord.Client();
// my model URL
const API_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=32.864944&lon=-97.357581&units=imperial&exclude=minutely,hourly,daily,alerts&appid=a0442bf4b3b03d9eedbbd223b77ca283';

//general channel
let generalChannel = "886743182589689939";
//weather channel
let weatherChannel = "892136754843365397";

function getWeather(){
		return fetch(API_URL)
		.then(res => {
				return res.json();
		})
		.then(data => {
				return data;
		})
}

let scheduledWeatherMessage = new cron.CronJob('00 14 * * *', () => {
			getWeather().then( weather => {
					client.channels.cache.get(weatherChannel).send("HERE IS YOUR DAILY MORNING WEATHER REPORT!!\nIt is currently: " + weather.current.temp + " degrees\nWith wind speeds of " + weather.current.wind_speed + "mph\nCloudiness of " + weather.current.clouds + "%\nAnd humidity percentage of " + weather.current.humidity + "%\nBeep boop.");
			})
});

let sundayMessage = new cron.CronJob('00 14 * * 0', () => {
			client.channels.cache.get(generalChannel).send("It's almost monday innit? Beep Boop.");
});

let mondayMessage = new cron.CronJob('00 14 * * 1', () => {
			client.channels.cache.get(generalChannel).send("Mondays suck innit? Beep Boop.");
});

let tuesdayMessage = new cron.CronJob('00 14 * * 2', () => {
			client.channels.cache.get(generalChannel).send("Tuesday innit? Beep Boop.");
});

let wednesdayMessage = new cron.CronJob('00 14 * * 3', () => {
			client.channels.cache.get(generalChannel).send("It's humpday innit? Beep Boop.");
});

let thursdayMessage = new cron.CronJob('00 14 * * 4', () => {
			client.channels.cache.get(generalChannel).send("The word Thursday itself comes from the Old English Thursdæg, from Old Danish Thūrsdagr, meaning Thors day. Also, it's Thursday. Beep Boop.");
});

let fridayMessage = new cron.CronJob('00 14 * * 5', () => {
			client.channels.cache.get(generalChannel).send("Funky friday innit? Beep Boop.");
});

let saturdayMessage = new cron.CronJob('00 14 * * 6', () => {
			client.channels.cache.get(generalChannel).send("It's the weekend innit? Beep Boop.");
});

// log out some info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// when the bot receives a message
// need async message because we are making HTTP requests
client.on('message', function(message) {
    // ignore messages from the bot itself
    if (message.author.bot) {
				return;
    }
    // if(message.author.username == "poopyface"){
		// 		message.channel.send("Shut up Adam, nobody cares. Beep boop.")
		// }

		if(message.content == "!temp"){
				getWeather().then( weather => {
					client.channels.cache.get(generalChannel).send("It is currently: " + weather.current.temp + " degrees fahrenheit in Saginaw, Texas. Beep boop.");
				})
		}

		if(message.content == "!weather"){
				getWeather().then( weather => {
					client.channels.cache.get(generalChannel).send("It is currently: " + weather.current.temp + " degrees\nwith wind speeds of " + weather.current.wind_speed + "mph,\ncloudiness of " + weather.current.clouds + "%,\nand humidity percentage of " + weather.current.humidity + "% in Saginaw, Texas.\nBeep boop.");
				})
		}
});
keepAlive();
scheduledWeatherMessage.start();
sundayMessage.start();
mondayMessage.start();
tuesdayMessage.start();
wednesdayMessage.start();
thursdayMessage.start();
fridayMessage.start();
saturdayMessage.start();
client.login(process.env.TOKEN);