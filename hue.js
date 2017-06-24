let huejay = require('huejay');
const config = require('./config');
const colorArray = require('./db/color.json');
const colorEffects = require('./db/effect_colors.json');

var status = 0;
var jobQueue = [];

let client = new huejay.Client({
  host:     config.hueIP,
  port:     80,               // Optional
  username: config.hueUsername,
  timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
});

function hueLamp(alertType){

  if(status === 1){ // If there is an alert happening put the new alert to queue
      jobQueue.push(alertType);
      console.log("New job request (" + alertType + ") has been added to queue as there is an ongoing process");
    }
    else {
      status = 1; // Lock alert to this one
      console.log("Active job: " + alertType);

      var alertName = ""; // Used later

      // If you want lower or higher bits to trigger alerts modify cheerOptions in config.js

      if(alertType >= config.cheerOptions.cheerTier1 && alertType < config.cheerOptions.cheerTier2){
        alertName = "bit_t1";
      }
      else if(alertType >= config.cheerOptions.cheerTier2 && alertType < config.cheerOptions.cheerTier3){
        alertName = "bit_t2";
      }
      else if(alertType >= config.cheerOptions.cheerTier3 && alertType < config.cheerOptions.cheerTier4){
        alertName = "bit_t3";
      }
      else if(alertType >= config.cheerOptions.cheerTier4){
        alertName = "bit_t4";
      }
      else{
        alertName = alertType;
      }

      var intervalID = setInterval(function () { // Loops until there is no jobs in queue
       config.hueLamps.map(function(lampID) { changeColor(lampID, alertName); });
       if (++lampTimer >= colorEffects[alertName].blinkTime) {
           clearInterval(intervalID);
           config.hueLamps.map(function(lampID) { changeColor(lampID, "normal"); });
           status = 0;
           console.log("Jobs Done! Checking queue for more jobs.");

           if(jobQueue.length > 0) {
             console.log("New Job!");

             var newAlertType = jobQueue[0];

             jobQueue.shift();

             // Change timeBetweenAlerts in config to extend or shorten time between each job
             setTimeout(function(){ hueLamp(newAlertType);}, config.timeBetweenAlerts);
           }
         }
       }, colorEffects[alertName].blinkMS);
    }

        lampTimer = 0;
    };

  function changeColor(lampID, color){
      client.lights.getById(lampID)
      .then(light => {

        var hue = colorArray[colorEffects[color].colorName].hue +"";
        // For random rainbow effect
        hue.indexOf("[rnd]") === 0 ? (hue = hue.split("[rnd]").join(""), hue = Math.floor(Math.random()*(hue.split("-")[1] - hue.split("-")[0] + 1) + hue.split("-")[1]), light.hue = parseInt(hue)) : light.hue = colorArray[colorEffects[color].colorName].hue;

          light.saturation = colorArray[colorEffects[color].colorName].saturation;
          if(light.brightness !== colorArray[colorEffects[color].colorName].brightness){
            light.brightness = colorArray[colorEffects[color].colorName].brightness;
          }
          else{
            light.brightness = colorArray[colorEffects[color].colorName].faded_brightness;
          }

      return client.lights.save(light);
      })
      .then(light => {
      })
      .catch(error => {
      console.log('Something went wrong');
      console.log(error.stack);
      });
    };



    module.exports =
    {
      hueLamp
    };
