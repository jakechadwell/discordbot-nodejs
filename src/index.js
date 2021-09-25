// discord.js import
const Discord = require('discord.js');
// node-fetch for making HTTP requests
const fetch = require('node-fetch');
// standard https for api call
const https = require('https');

const mySecret = process.env['API_TOKEN']

// const Database = require("@replit/database")
// const db = new Database()


// initialize client
const client = new Discord.Client();
// my model URL

function getWeather(){
		return fetch(API_URL)
		.then(res => {
				return res.json();
		})
		.then(data => {
				console.log(data.weather)
				return data;
		})
}

// log out some info
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

		getWeather().then( weather => {
			console.log(weather)
		})
});

// when the bot receives a message
// need async message because we are making HTTP requests
client.on('message', function(message) {
    // ignore messages from the bot itself
    if (message.author.bot) {
				return;
    }
		if(message.content == "!temp"){
				getWeather().then( weather => {
					message.channel.send("It is currently: " + weather.current.temp + " degrees fahrenheit in Saginaw, Texas. Beep boop.");
				})
		}

		if(message.content == "!weather"){
				getWeather().then( weather => {
					message.channel.send("It is currently: " + weather.current.weather.description + " in Saginaw, Texas. Beep boop.");
				})
		}
});

client.login(process.env.TOKEN);