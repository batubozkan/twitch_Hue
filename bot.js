const tmi = require("tmi.js");
const chalk = require('chalk');
const config = require('./config');
const hue = require('./hue');

var client = new tmi.client(config.options);

//If connection is successful print message
client.on("connected", function (address, port){
  console.log(chalk.yellow("Successfully connected to " + config.options.channels))
});

//If not print disconnect reason
client.addListener('disconnect', function(reason){
  console.log(chalk.red("Disconnected! Reason: " + reason));
});

//Listen twitchNotify messages for subscription
client.on("subscription", function (channel, username, method) {
  console.log(chalk.green(username) + " subbed!"); //Print username of the subscriber to console
  hue.hueLamp("sub_1");
});

client.on("resub", function (channel, username, months, message) {
  console.log(chalk.green(username) + " resubbed for " + months + " months!");  //Print username of the subscriber to console

  //Check sub time for Hue effect.
  if(months < 3){
    months = "1";
  }
  else if(months >= 3 && months < 6){
    months = "3"
  }
  else if(months >= 6 && months < 12){
    months = "6"
  }
  else if(months >= 12 && months < 24){
    months = "12"
  }
  else if(months >= 24){
    months = "24"
  }

  hue.hueLamp("sub_" + months);
});

////Listen chat messages for cheers
client.on("cheer", function (channel, userstate, message) {
  if(userstate.bits >= config.cheerLimit){ //If users bit amount is not bigger that Hue trigger amount dont go in. You can change this in config.js
    hue.hueLamp(userstate.bits);
  }
});

// Connect the client to the server...
client.connect().then(function () {
		client.raw("CAP REQ :twitch.tv/membership");
		client.raw("CAP REQ :twitch.tv/commands");
		client.raw("CAP REQ :twitch.tv/tags");
});
