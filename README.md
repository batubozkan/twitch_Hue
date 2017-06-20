# twitch_Hue
Twitch Bot which changes colors of Philips Hue lamps based on cheers and subs.

Dependecies
-----------

* [Node.js](https://nodejs.org/en/download/)
* [tmi.js](https://www.tmijs.org)
* [HueJay](https://github.com/sqmk/huejay)


Installation for Linux
----------------------

Clone repository to a folder.
Open a terminal to that folder.
Run these commands on the terminal and follow the Instructions from the Script:

        chmod +x linuxInstall.bash
        ./linuxInstall.bash
        
Run the command below to run the bot:

        node bot.js

Installation for Windows
------------------------

Clone repository to a folder.
Open a command prompt to that folder.

Run the command below first:

        npm install

Make sure that your Hue Bridge is connected on the same network as the computer.

Run the command below:

        node setup_first.js

Copy the IP address of your preferred bridge. Paste it in both of [setup_second.js's 11th line](https://github.com/batubozkan/twitch_Hue/blob/master/setup_second.js#L11) and [config.js's 15th line](https://github.com/batubozkan/twitch_Hue/blob/master/config.js#L15).

Run the command below:

        node setup_second.js
        
Copy everything from the output.

Paste the username to [config.js's 17th line](https://github.com/batubozkan/twitch_Hue/blob/master/config.js#L17).

Enter the lamp IDs you want to use to [config.js's 29th line](https://github.com/batubozkan/twitch_Hue/blob/master/config.js#L29).

Enter your Twitch Channel Name to [config.js's 12th line](https://github.com/batubozkan/twitch_Hue/blob/master/config.js#L12).

Enter your Bot Account's Name to [config.js's 9th line](https://github.com/batubozkan/twitch_Hue/blob/master/config.js#L9).

Enter your Bot Account's oAuth Key to [config.js's 10th line](https://github.com/batubozkan/twitch_Hue/blob/master/config.js#L10). You can get it from [here.](https://twitchapps.com/tmi/)

Run the command below to run the bot:

        node bot.js
