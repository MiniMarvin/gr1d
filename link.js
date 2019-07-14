// var express = require('express');
// var app = express();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();



// app.use(express.bodyParser());
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/gen_link', (req, res) => {
	console.log('generate the link with:', req.body);
	
	// generate the random id to the user

	// save the context to textfile in json string

	res.send(200, 'OK');
});

app.get('/check_id/*', (req, res) => {
	console.log(req.get('host'));
	console.log(req.originalUrl); // get the url
	res.send(req.get('host'));
	// check file with id

	// get the context from the number

	// return a page to redirect to the bot with the context
})

// var server = require('http').createServer();
app.listen(8080);

// write in file
// const fs = require('fs');
// fs.writeFile("/tmp/test", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 


