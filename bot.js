import { Client } from 'discord.io';
import { remove, transports, add, level, info } from 'winston';
import { token as _token } from './auth.json';
// Configure logger settings
remove(transports.Console);
add(new transports.Console, {
    colorize: true
});
level = 'debug';
// Initialize Discord Bot
var bot = new Client({
   token: _token,
   autorun: true
});
bot.on('ready', function (evt) {
    info('Connected');
    info('Logged in as: ');
	info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
	// It will listen for messages that will start with '&'
	var commandChar = '&'
	var rollCommandRegex = /~ ?-?(t|\d*d\d+|\d+)( ?[+-] ?-?(t|\d*d\d+|\d+))* ?[vlhVC]*/;
	var elementRegex = /([+-]?) ?(-?t|(-?\d*)d(\d+)|-?\d+)/g;

	if (message == '&ping'){
		bot.sendMessage({ to: channelID, message: 'pong' });
	}

	/*
	if (rollCommandRegex.test(message)){
		let array = [...str.matchAll(regexp)];
	}
	
	
    if (message.indexOf('~') != -1) {
		var output = '';
		var keyIndex = message.indexOf('~');
        var args = message.substring(keyIndex+1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
		output = output + 'cmd: ' + cmd + ' | ';
		
		if (cmd == 'ping') {
			output = output + 'pong';
		} else if (cmd == 'info'){
			output = output + 'Currently in development please be patient';
		}else if (cmd[0] == 't') {
			
			var roll = Math.floor(Math.random()*20)+1;
			output = output + ' d20 '+ roll + ' | ';
		} else {
			
		}
		
		bot.sendMessage({ to: channelID, message: output });
    }
	*/
});
function rollD20(str) {
	var re = /(\+|-)(-?\d+)/g;
	let array = [...str.matchAll(re)];
	
	var roll = Math.floor(Math.random()*20)+1; 
	return roll+str;
}
function roll(d,n,a,s) {
	var seedrandom = require('seedrandom');
	if(!d) {
		d=20;
	}
	if(!n) {
		n=1;
	}
	if(!a) {
		a=0;
	}
	if(!s) {
		var rng = new Math.seedrandom();
	} else {
		var rng = new Math.seedrandom(String(s));
	}

	return Math.floor(n*rng()+1)+a;
}