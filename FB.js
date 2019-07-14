const request = require('request');
const dialog_control = require("./dialogflow.js")

exports.PAGE_ACCESS_TOKEN = "EAAGjYJD8Ha8BAJj1odfUpuj8oXZANBvZC0OZBI4QCSA4lcjdNu5Dyzgb2ibz3vn6ZC899mZBzXdaZCcDGwhrvZAJ4aWVDiVhZC4ubXauVrmzenbOiPtDCY0uYQuYnz6UDWfLOZA9ZAd2ZAfXedAftZCZA5zO5mQFINgQutH7qoToTtaLm9gZDZD";
exports.VERIFY_TOKEN = "gr1d";

// Handles messages events
exports.handleMessage = async function (sender_psid, received_message, current_date) {
    // Check if the message contains text
    if (received_message.text) {   
        //Call Dialogflow
        await dialog_control.getDialog(sender_psid, received_message.text, "FACEBOOK", current_date);
    }
}

// Handles messaging_postbacks events
exports.handlePostback = async function (sender_psid, received_postback, current_date) {
  console.log("POSTBACK")
  await dialog_control.getDialog(sender_psid, received_postback.title, "FACEBOOK", current_date);
}

// Sends response messages via the FACEBOOK Send API
exports.sendFBCards = async function (sender_psid, cardArray){
  // Construct the message body

  let request_body = {
    "recipient":{
      "id": sender_psid
    },
    'messaging_type': 'RESPONSE',
    "message":{
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": cardArray
        }
      }
    }
  }
  return new Promise((resolve, reject) => {
      request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": exports.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
      
  },  (err, res, body) => {
      if (!err) {
         console.log('card message sent!')
      } else {
         console.error("Unable to send card message:" + err);
      }
      resolve()
  });  
  })
}


//Send Text
exports.sendFBText =  async function sendFBText(sender_psid, response) {
  // Construct the message body
  response = {
    "text": response
  }

  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  return new Promise((resolve, reject) => {
      request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": exports.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
  },  (err, res, body) => {
      if (!err) {
         console.log('text message sent!')
      } else {
         console.error("Unable to send text message:" + err);
      }
      resolve()
  });  
  })
}

//Send QuickReplies
exports.sendFBQuickReplies = async function (sender_psid, title, quickReplies){
  let response = {
    "text": title,
    "quick_replies":[]
  }
  
  for (var i in quickReplies){
    let quickReply = quickReplies[i]
    response.quick_replies.push(
      {
        "content_type":"text",
        "title":quickReply,
        "payload":quickReply,
      }
    )
  }

  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }
  return new Promise((resolve, reject) => {
      request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": exports.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
  },  (err, res, body) => {
      if (!err) {
         console.log('quick reply message sent!')
      } else {
         console.error("Unable to send quick reply message:" + err);
      }
      resolve()
  });  
  })
}

exports.sendBackMenu = async function(sessionId){
  console.log("sendBackMenu")
  exports.sendFBQuickReplies(sessionId, "Posso te ajudar em algo mais?", ["Voltar ao menu", "Deixar uma sugestão"]);
}

//Configure "Get Started" Button on Facebook
exports.configureGetStartedEvent = function configureGetStartedEvent() {
    request({
            method: 'POST',
            uri: `https://graph.facebook.com/v2.6/me/thread_settings?access_token=${exports.PAGE_ACCESS_TOKEN}`,
            json: {
                setting_type: "call_to_actions",
                thread_state: "new_thread",
                call_to_actions: [
                    {
                        payload: "FACEBOOK_WELCOME"
                    }
                ]
            }
        },
        (error, response, body) => {
            if (error) {
                console.error('Error while subscription', error);
            } else {
                console.log('Get Started Configured', response.body);
            }
        });
}