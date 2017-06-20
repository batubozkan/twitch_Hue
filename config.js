var options = {
    options: {
        debug: false // Change this to true if you want to see chat logs
    },
    connection: {
        reconnect: true
    },
    identity: {
        username: "", // Enter username of the bot inside of quotes
        password: "" // Get your bots oauth key from here https://twitchapps.com/tmi/
    },
    channels: ["#"] // Enter channel name after #
};

var hueIP = '' //Enter Hue bridge IP inside of the quotes

var hueUsername = '' //Enter Hue username inside of the quotes. You can get your username from setup.js

var cheerOptions = {
  cheerTier1: 100,
  cheerTier2: 1000,
  cheerTier3: 5000,
  cheerTier4: 10000
  //cheerTier5: 10 (EXAMPLE)
}

var timeBetweenAlerts = 3000; //Queue system delay

var hueLamps = [] // You can put multiple Lamp ID's. (Example: var hueLamps = [2, 4])

module.exports =
{
  options,
  hueIP,
  hueUsername,
  cheerOptions,
  timeBetweenAlerts,
  hueLamps
};
