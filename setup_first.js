//TO USE THIS SCRIPT YOU HAVE TO BE ON THE SAME NETWORK AS THE HUE BRIDGE.

let huejay = require('huejay'); // Install Huejay by using "npm install huejay" in nodeJS

// Discover IP of the bridge
huejay.discover()
  .then(bridges => {
    for (let bridge of bridges) {
      console.log(`Copy this IP to hueIP in config.js and setup : ${bridge.ip}`);
    }
})
  .catch(error => {
    console.log(`An error occurred: ${error.message}`);
});
