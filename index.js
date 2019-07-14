//Imports
const express = require('express');
const app = express();
const request = require('request');

const bodyParser = require('body-parser')
const cors = require("cors");
const FB = require("./FB.js")

//Dialogflow
const projectId = 'gr1d-viclxt';

//Configure Express
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Chatbot is running');
  console.log("yay!")
});

//Bot Verification
app.get('/webhook', (req, res) => {
    // Parse the query params
    console.log("webhook")
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === FB.VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(201).send(challenge);
    
         } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);      
        }
  }
  else{
      res.sendStatus(403);
  }
});


//FACEBOOK MESSAGE RECEIVED
app.post('/webhook',function(req, res) {
        let body = req.body;
        // Checks this is an event from a page subscription
        if (body.object === 'page') {
             // Iterates over each entry - there may be multiple if batched
            body.entry.forEach(async function(entry) {
                // Gets the message. entry.messaging is an array, but 
                // will only ever contain one message, so we get index 0
                let webhook_event = entry.messaging[0];
                if (webhook_event.message || webhook_event.postback){
                  // Get the sender PSID
                  let sender_psid = webhook_event.sender.id;
     
                  
                console.log("MESSAGE");
                await FB.handleMessage(sender_psid, webhook_event.message); 
              }
            });
            return res.status(202).send('EVENT_RECEIVED');  
        }
        else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }  
});


//***********************Initializations*********************
//Initial
//FB.configureGetStartedEvent() //Add the "Get Started Button"

/***********SERVER INITIALIZATION*******/
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = 8080; 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});