var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');
let baseHost = "127.0.0.0.1:8080/";
const https = require('https');
var request = require('request');


getDataFromCPF("11055828419", (data) => {
  console.log(data);
});

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