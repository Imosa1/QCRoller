var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	var rollCommandRegex = /~ ?-?(t|\d*d\d+|\d+)( ?[+-] ?-?(t|\d*d\d+|\d+))* ?[vlhVC]*/;
	var elementRegex = /([+-]?) ?(-?t|(-?\d*)d(\d+)|-?\d+)/g;
	
	if (rollCommandRegex.test(message)){
		let array = [...str.matchAll(regexp)];
	}
	
	/*
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