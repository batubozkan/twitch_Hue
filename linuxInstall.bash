#!/bin/bash

# Install Script for twitch_Hue,
#
# written by linuxgemini

clear

function test_command {
	if hash $1 2>/dev/null; then
		return 0
	else
		echo "$1"
		return 1
	fi
}

function test_if_local {
	if echo "$1" | grep -E '(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)' 2>/dev/null; then
		return 0
	else
		echo "$1"
		return 1
	fi
}

function does_it_exist {
	if [[ -z $1 ]]; then
		echo "$1"
		return 1
	else
		return 0
	fi
}

if test_command "node" >/dev/null; then
	isNodeInstalled=yes
fi

LocalIPAdresses=`ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | grep -E '(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)'`

printf "\nHello, I will help you installing the twitch_Hue.\n\n"

while [[ -z $yn1 ]]; do
	read -p "Do you have your Hue Bridge online on the same network as the computer? [Yes / No] " yn1
	case $yn1 in
		[Yy]* )
			sleep 1
			if [[ -z $isNodeInstalled ]]; then
				printf "\nThis computer doesn't have node.js installed.\nPlease install and re-run this script.\n\n"
				exit
			fi
			npm install
			sleep 1
			printf "\n"
			node setup_first.js
			printf "\n"

			read -p "Please put your preferred Hue Bridge IP Address here: " ip1
			until test_if_local "$ip1" >/dev/null; do
				printf "\nYour IP address is not local, try again.\n\n"
				read -p "Please put your Hue Bridge IP Address here: " ip1
			done
			sed -i "11i  host:     '$ip1',               // Get this from setup_first.js" setup_second.js
			sed -i "15ivar hueIP = '$ip1' //Enter Hue bridge IP inside of the quotes" config.js
			sleep 1
			while [[ -z $yn2 ]]; do
				read -p "Are you on a terminal that you can copy outputs easily? [Yes / No] " yn2
				case $yn2 in
					[Yy]* )
						sleep 1
						printf "\n"
						node setup_second.js
						printf "\n"
						printf "\nPlease copy or note the stuff that came up above.\nDo not use Ctrl+C here.\n\n"
						while [[ -z $yn3 ]]; do
							read -p "Have you done it? [Yes / No] " yn3
							case $yn3 in
								[Yy]* )
									until does_it_exist "$userName" >/dev/null; do
										printf "\nYou need to insert your Hue Bridge Username below to continue.\n\n"
										read -p "What is your Hue Bridge Username? It must have been showed above: " userName
									done
									sed -i "17ivar hueUsername = '$userName' //Enter Hue username inside of the quotes. You can get your username from setup.js" config.js

									until does_it_exist "$TWchannel" >/dev/null; do
										printf "\nYou need to insert your Twitch Channel Name below to continue.\n\n"
										read -p "What is your Twitch Channel Name?: " TWchannel
									done
									sed -i "12i    channels: ["#$TWchannel"] // Enter channel name after #" config.js

									until does_it_exist "$TWuserName" >/dev/null; do
										printf "\nYou need to insert your Twitch Bot's Username below to continue.\n\n"
										read -p "What is your Twitch Bot's Username?: " TWuserName
									done
									sed -i "9i        username: "$TWuserName", // Enter username of the bot inside of quotes" config.js

									until does_it_exist "$TWoauthPass" >/dev/null; do
										printf "\nYou need to insert your Twitch Bot's oAuth key below to continue.\nYou need to go to https://twitchapps.com/tmi/ to get it.\n\n"
										read -p "What is your Twitch Bot's oAuth key?: " TWoauthPass
									done
									sed -i "10i        password: "$TWoauthPass" // Get your bots oauth key from here https://twitchapps.com/tmi/" config.js

									until does_it_exist "$hueLamps" >/dev/null; do
										printf "\nYou need to insert your Hue Lamps' IDs below to continue.\nExample without quotes, \"2, 4\"\n\n"
										read -p "What is your Hue Lamps' IDs?: " hueLamps
									done
									sed -i "29ivar hueLamps = [$hueLamps] // You can put multiple Lamp ID's. (Example: var hueLamps = [2, 4])" config.js

									sleep 1
									printf "\nDone! You can do \"node bot.js\" to run your bot.\n\n"
									exit
									;;
								[Nn]* )
									printf "\nPlease do it.\n\n"
									unset yn3
									;;
								* )
									printf "\nJust write \"yes\" or \"no\" and hit enter.\n\n"
									unset yn3
									;;
							esac
						done
						;;
					[Nn]* )
						printf "\nI am gonna shut myself down for this operation.\nPlease use a terminal that you can copy stuff easily.\n\n"
						exit
						;;
					* )
						printf "\nJust write \"yes\" or \"no\" and hit enter.\n\n"
						unset yn2
						;;
				esac

			done
			;;
		[Nn]* )
			printf "\nMake your Hue bridge online.\nYour computer has these local addresses:\n\n$LocalIPAdresses\n\n"
			unset yn1
			;;
		* )
			printf "\nJust write \"yes\" or \"no\" and hit enter.\n\n"
			unset yn1
			;;
	esac
done
