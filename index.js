// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



/*const responseApi = (unix, timestamp) => {
  unix: unix,
  timestamp: timestamp,
  toUnix(){
    return Math.floor(timestamp/1000)}
}
*/

app.get("/api/:date?", (req, res) => {
  const { date } = req.params; //getting response from url
  
  const dateString = { date }.date //assigning variable to date provided through url parameter

  
  //utc string time working
  const utcTime = new Date(Date.parse(dateString));
  
// getting unix time, need to set Date.parse to parse a UTC date to Unix
  const unixTime = Date.parse(utcTime)
  
   // if catch function fails, shows actual timestamp
    if (dateString) {
    res.json({ unix: unixTime, utc: utcTime })
  } else {
    //working - applies when there isn't parameter text for /api/...
    const unixDate = Date.now()
    const utcDate = new Date(unixDate)
    const dateString = utcDate.toUTCString();
    res.json({ unix: unixDate, utc: dateString })
  }


})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
