const express = require('express');
const { App, ExpressReceiver } = require('@slack/bolt');
const { WebClient } = require('@slack/web-api');
const cron = require('cron');
require('dotenv/config');

const app = express();
const receiver =
    new ExpressReceiver({
        token: process.env.SLACK_BOT_TOKEN,
        signingSecret: process.env.SLACK_SIGNING_SECRET,
    });

const slackBotToken = process.env.SLACK_BOT_TOKEN || "xoxb-5741782831479-5895114667910-cJOQSogkrC7JgLNUU5zB238A"

const slackWebClient = new WebClient(slackBotToken);

// const slackApp = new App({
//     receiver,
//     token: process.env.SLACK_BOT_TOKEN,
//     signingSecret: process.env.SLACK_SIGNING_SECRET,
// });

app.get('/', (req, res) => {
    sendMessageToSlack();
    res.send('Hello World!');
});

async function sendScheduledMessage(channel, blocks) {
    try {
        await slackWebClient.chat.postMessage({
            channel: channel,
            blocks: blocks,
            text: "Hello, it's time for an update..."
        });
        console.log('Message sent successfully.');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function fetchlist() {
    const channel = 'D05S36GH2UX';

    try {
        var requestOptions = {
            method: 'GET',
            headers: {
                "xc-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJhbGFqaXNAZjIybGFicy5jb20iLCJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJpZCI6InVzX2lnYm52OXY1YTgxNzViIiwicm9sZXMiOiJvcmctbGV2ZWwtY3JlYXRvcixzdXBlciIsInRva2VuX3ZlcnNpb24iOiIxNzE1OTdhNGYyNTEyNjc1OTgzOWE3MDUwYTUwNGZlZDMxY2IzMWQzMDY5YjNkZWE4NjkxOWZjNzc5MzJmNGYxZGM2NWUyZDllNmM4ZDI4MSIsImlhdCI6MTY5NTM2NjQxNSwiZXhwIjoxNjk1NDAyNDE1fQ.lzCdX9YFL95o2XhPS0oRDDua55wMasCcJ_yzX17PCrw",
                "xc-token": "BgiS53fqdTmRGc53eIiUHIZ-tD3Rlfe1cO0siEAZ"
            },
            redirect: 'follow'
        };

        const response = await fetch('https://minio-nocodb.bmohox.easypanel.host/api/v1/db/data/v1/slackbot/ScheduleTime', requestOptions);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from NocoDB. Status: ${response.status}`);
        }
        const scheduledTasks = await response.json();
        // console.log("scheduledTasks", scheduledTasks);
        for (let elem of scheduledTasks.list) {
            // console.log("fghvjbkn", elem);
            callJob(elem);
        }

        // return scheduledTasks;
    } catch (error) {
        console.error('Error fetching scheduled tasks from NocoDB:', error);
        return [];
    }
}

function callJob(elem) {
    // new cron.CronJob(
    //     elem.ScheduleTime,
    //     async () => {
    const channel = 'D05S36GH2UX';

    const options = elem.questions.map(question => {
        const [text, value] = question.Title.split(',').map(str => str.replace(/[{}\[\]]/g, '').trim());

        return {
            text: {
                type: 'plain_text',
                text: text,
            },
            value: value,
        };
    });
    console.log("options", options);

    const pollBlocks = [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: 'Good morning! Are you working today?',
            },
        },
        {
            type: 'actions',
            block_id: 'aoll_block',
            elements: [
                {
                    type: 'static_select',
                    placeholder: {
                        type: 'plain_text',
                        text: 'Select an option',
                    },
                    options: options,
                    action_id: 'boll_selection',
                },
            ],
        },
    ];

    sendScheduledMessage(channel, pollBlocks);

    // try {
    //     await sendScheduledMessage(channel, pollBlocks);
    // } catch (error) {
    //     console.log("Error sending message:", error);
    // }
}
//     ,
//     null,
//     true,
//     process.env.TIME_ZONE
// );
// }

function sendMessageToSlack() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer xoxb-5741782831479-5898028532228-3HtCZABzX3LJDPE2Q065eYu8");
    myHeaders.append("Content-type", "application/json");
    myHeaders.append("Cookie", "b=57261f32b3951c2e437b48644157564f");

    var raw = JSON.stringify({
        "channel": "D05T0GWMLBA",
        "text": "Hello world :tada:"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://slack.com/api/chat.postMessage", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

app.post('/', (req, res) => {
    sendMessageToSlack();
    fetchlist();
    // console.log(req.body);
    res.send({ message: "done" });
});

app.listen(process.env.PORT, () => {
    console.log('Example app listening on port 3000!');
});

// xapp-1-A05SGP932TC-5990469211296-e5f844ad22bca57fd96ccdcb109628aed717e963ce30099a4012df60f71ed98e


// Properties of an app level token

// Generated By
// balajis
// Date Generated
// September 29th, 2023

// Token
// xapp-1-A05SGP932TC-5990469211296-e5f844ad22bca57fd96ccdcb109628aed717e963ce30099a4012df60f71ed98e
// Scope
// app_configurations:write
// Configure your application

/*
{
  "type": "records.after.insert",
  "id": "50b17003-44a8-4b35-892d-a2542aadd037",
  "data": {
    "table_id": "md_wkqhce2qp5dgww",
    "table_name": "ChannelQuestions",
    "view_id": "vw_9jo8vc7hfbq9cx",
    "view_name": "ChannelQuestions",
    "rows": [
      {
        "Id": 1,
        "ChannelId": "Sample Text",
        "CreatedAt": "2023-09-28T11:09:50.758Z",
        "UpdatedAt": "2023-09-28T11:09:50.758Z",
        "QuestionId": "Sample Text",
        "ScheduleTime": "Sample Text"
      }
    ]
  }
}
*/
