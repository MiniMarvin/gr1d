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
        if (result.text){
            var text = result.text.text[0];
            text.replace("$place", exports.database[sessionId].to)
            await FB.sendFBText(sessionId, text);
        }
        
        else if (result.quickReplies){
          if (result.platform === "FACEBOOK"){
            console.log("quickies")
            var title  = result.quickReplies.title
            title = title.replace("$place", exports.database[sessionId].to)
            await FB.sendFBQuickReplies(sessionId, title, result.quickReplies.quickReplies)
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

}
exports.processAction().catch(console.error);