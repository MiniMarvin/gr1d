// var express = require('express');
// var app = express();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const fs = require('fs');

async function makeid(length) {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// app.use(express.bodyParser());
app.use(bodyParser.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});

app.post('/genLink', async (req, res) => {
	console.log('generate the link with:', req.body);
	
	// generate the random id to the user
	let userid = req.body["userid"];
	let sessionid = await makeid(10);
	let id = sessionid + userid;

	// save the context to textfile in json string

	res.send(200, 'OK');
});

app.get('/checkId/*', async (req, res) => {
	console.log(req.get('host'));
	console.log(req.originalUrl); // get the url
	
	// res.send(req.get('host') + "/" + x);
	
	// check file with id
	let parts = req.originalUrl.split('/');
	let id = parts[1];
	let path = "register/" + id + ".json";

	// get the context from the number
	try {
	  if (fs.existsSync(path)) {
		let rawdata = fs.readFileSync(path);
		let contextData = JSON.parse(rawdata);  


		// TODO: redirect to the 
		res.send("<!DOCTYPE html><html><head><title>redirecting...</title></head>\
			<body>\
				<script type=\"text/javascript\">\
					// window.location.replace(\"http://google.com\");\
				</script>\
			</body>\
			</html>\
		");
	  }
	  else {
	  	res.send("<!DOCTYPE html><html><head><title>redirecting...</title></head>\
			<body>\
				<script type=\"text/javascript\">\
					// window.location.replace(\"http://google.com\");\
				</script>\
			</body>\
			</html>\
		");
	  }
	} catch(err) {
	  console.error(err);
	  res.send(500, "ERROR");
	}


	// return a page to redirect to the bot with the context
})

// var server = require('http').createServer();
app.listen(8080);

// write in file

// fs.writeFile("/tmp/test", "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
// }); 



















