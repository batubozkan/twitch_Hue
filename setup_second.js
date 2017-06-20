/*
TO USE THIS SCRIPT YOU HAVE TO BE ON THE SAME NETWORK AS THE HUE BRIDGE.

DONT FORGET TO PRESS HUE BRIGDE BUTTON BEFORE STARTING THE SCRIPT!
*/

let huejay = require('huejay');

// Create Hue bridge connection
let client = new huejay.Client({
  host:     '', // Get this from setup.js
  port:     80,               // Optional
  username: '',               // Not required here
  timeout:  15000,            // Optional
});

// Create Hue bridge username
if(client.username === ''){
  let user = new client.users.User;

  user.deviceType = 'my_device_type'; // DONT CHANGE THIS

  client.users.create(user)
    .then(user => {
      console.log(`Copy this username to hueUsername in config.js : ${user.username}`);
    })
    .catch(error => {
      if (error instanceof huejay.Error && error.type === 101) {
        return console.log(`Link button not pressed. Try again...`);
      }

      console.log(error.stack);
  });
}

// Get all Lamp details
if(client.username !== ''){
  client.lights.getAll()
    .then(lights => {
      for (let light of lights) {
          console.log(`Light ID [${light.id}]: ${light.name}`);
      }
      console.log("WRITE DOWN LIGHT IDs THAT YOU WANT TO ACTIVATE");
  });
}
