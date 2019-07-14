var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
let baseHost = "127.0.0.0.1:8080/";
const https = require('https');
var request = require('request');

const dialogflow = require('dialogflow');

//Dialogflow
const projectId = 'gr1d-viclxt';
const languageCode = 'pt-BR';

var FB = require("./FB.js")

exports.database = {}

exports.getDialog = async function (sessionId, query, client){
    console.log("Session ID: " + String(sessionId));
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    // The text query request.
    const dialogflow_request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: languageCode,
        },
      },
    };
    
    var cardArray = []
    
    // Send request and log result
    console.log("GO!")
    const responses = await sessionClient.detectIntent(dialogflow_request)
    console.log("INTENT:")
    console.log(responses[0].queryResult.intent.displayName)
    
    for (var i in responses[0].queryResult.fulfillmentMessages) {
      let result = responses[0].queryResult.fulfillmentMessages[i]
        console.log(result.platform)

        console.log(exports.database)

        if (result.text){
            var text = result.text.text[0];
            if (exports.database[sessionId]) {
              text = text.replace("$place", exports.database[sessionId].to)
            }
            await FB.sendFBText(sessionId, text);
        }
        
        else if (result.quickReplies){
          if (result.platform === "FACEBOOK"){
            console.log("quickies")
            var title  = result.quickReplies.title
            if (exports.database[sessionId]) {
              title = title.replace("$place", exports.database[sessionId].to)
            }
            await FB.sendFBQuickReplies(sessionId, "Estes são os planos disponíveis:", insurancePlans)
          }
        }
        else if (result.card){
          if (result.platform === "FACEBOOK"){
            //Cards are sent at the end, all together as a carrousel
            
            var buttons = []
            for (var i in result.card.buttons){
              let button = {
                  "type": "postback",
                  "title": result.card.buttons[i].text,
                  "payload": result.card.buttons[i].text
              }
              buttons.push(button)
            }
            
            var object = {
              "title": result.card.title,
              "image_url":result.card.imageUri,
              "subtitle":result.card.subtitle,
              "buttons": buttons
            }
            cardArray.push(object)
          }
        }
    }
    
    if(cardArray.length > 0){
      await FB.sendFBCards(sessionId, cardArray)
    }
    
    if (responses[0].queryResult.action){
      exports.processAction(sessionId, responses[0].queryResult.action, responses[0].queryResult.parameters, client, query)
    }
    
}

//Process Actions
exports.processAction = async function (sessionId, action, parameters, client, message){
  if (action == "cpf") {
    console.log("get data from cpf")
    console.log(parameters)
    getDataFromCPF("11055828419", (data) => {
      console.log(data);
      exports.database[sessionId]["cpf"] = data;

      let cardArray = []
    });
  }
}
exports.processAction().catch(console.error);

async function getDataFromCPF(cpf, callback){
  console.log(cpf)

  // faz um post
  request({
      url: "https://gateway.gr1d.io/sandbox/bigdata/bigboost/v1/peoplev2",
      method: "POST",
      headers: {
          "content-type": "application/json",
          "x-api-key": "52d2e55d-0561-4178-b812-079491fa1769"
        },
      json: {
      "Datasets": "basic_data",
      "q": "doc{" + cpf + "}"
      }
  //  body: JSON.stringify(requestData)
      },
      function (error, resp, body) {
        //console.log(body);
        console.log(body['Result'][0]['BasicData']);
        console.log("here")
        callback(body['Result'][0]['BasicData']);        
        // res.send("OK");
        // return body['Result'][0]['BasicData'];
      });
  // return "dssdsd"
}