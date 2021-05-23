const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const axios = require('axios');
var https = require('https');
var fs = require('fs');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

app.post("/getOutput", (request, response) => {
	
	var pin = request.body.pincode;
	var date = request.body.date;
	
	console.log(pin);
	console.log(date);
	
	var config = {
  method: 'get',
  url: 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+pin+'&date='+date,
  headers: { 
   'Accept': 'application/json', 
    'Accept-Language': 'en_US', 
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
    
  }
};

axios(config)
.then(function (responseExt) {
	 var data = JSON.parse(JSON.stringify(responseExt.data));
  console.log(JSON.stringify(responseExt.data));
  response.json(data);
})
.catch(function (error) {
  console.log(error);
  response.json(error);
});
	
});


var port = process.env.PORT || 8080; 
const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
//https.createServer(options, app).listen(443);