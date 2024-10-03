// import bsky from '@atproto/api';
// const { BskyAgent } = bsky;
// import * as dotenv from 'dotenv';
// import { CronJob } from 'cron';
// import * as process from 'process';
// import * as unparse from 'nearley-unparse' //uses nearly grammar for madlibs

var bsky = require("@atproto/api"); 
var dotenv = require("dotenv"); 
var cron = require("cron"); 
var process = require("process"); 

const { BskyAgent } = bsky;
const { CronJob } = cron;
var unparse = require("nearley-unparse"); //uses nearly grammar for madlibs
var grammarA = require("./grammar"); // Can update the grammar to get better lists
var grammarB = require("./Grammar-poetry.js"); 



// var dotenv = require('dotenv').config(); //needed to protect twitter api details 

dotenv.config();
// const port = process.env.PORT || "8080";

// Create a Bluesky Agent 


const agent = new BskyAgent({
    service: 'https://bsky.social',
});


async function PostPillow(Pillowtext) {
	await agent.login({
		identifier: process.env.BLUESKY_LOGIN,
		password: process.env.BLUESKY_PASSWORD,
	});
	const response = await agent.post({
        text: Pillowtext
    });
}

function letsdothis() {
	if (Math.random() <0.5) {

		var	src = unparse(grammarA);

		} else {
	
		var	src = unparse(grammarB);

		}
	console.log(src)
	PostPillow(src)
}

const scheduleExpressionMinute = '* * * * *'; // Run once every minute for testing
const scheduleExpression = '0 */6 * * *'; // Run once every three hours in prod
const job = new CronJob(scheduleExpression, letsdothis);
job.start();