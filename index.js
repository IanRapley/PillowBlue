var bsky = require("@atproto/api"); // import bsky from '@atproto/api';
var dotenv = require("dotenv"); // import * as dotenv from 'dotenv';
var cron = require("cron"); // import { CronJob } from 'cron';
var process = require("process"); // import * as process from 'process';
const request = require('request');
var express = require('express');
var unparse = require("nearley-unparse"); // import * as unparse from 'nearley-unparse' //uses nearly grammar for madlibs

const { BskyAgent } = bsky;
const { CronJob } = cron;
dotenv.config();
var grammarA = require("./grammar"); // Can update the grammar to get better lists
var grammarB = require("./Grammar-poetry.js"); 


var app = express();
var port = process.env.PORT || 8080;    // Needed to ensure heroku can listen to the right port - not needed for local running
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

// Create a Bluesky Agent 
const agent = new BskyAgent({
    service: 'https://bsky.social',
});

const BSLog = process.env.BLUESKY_LOGIN;
const BSPass = process.env.BLUESKY_PASSWORD;

// Basic post to Bluesky
async function PostPillow(Pillowtext) {
	await agent.login({
		identifier: BSLog,
		password: BSPass,
	});
	const response = await agent.post({
        text: Pillowtext
    });
}


// Text generator
function letsdothis() {
	if (Math.random() <0.5) {

		var	src = unparse(grammarA);

		} else {
	
		var	src = unparse(grammarB);

		}
	console.log(src)
	PostPillow(src)
}

letsdothis;

// hopefully stops heroku timeout
var reqTimer = setTimeout(function wakeUp() {
   request("https://pillowbot-c8d50915d811.herokuapp.com", function() {
      console.log("WAKE UP DYNO");
   });
   return reqTimer = setTimeout(wakeUp, 1200000);
}, 1200000);



// retweet in every 5 minutes (300,000) 6 hours (21,600,000)
setInterval(letsdothis, 21600000);




// const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
// const scheduleExpression = '0 */6 * * *'; // Run once every three hours in prod
// const job = new CronJob(scheduleExpression, letsdothis);
// job.start();