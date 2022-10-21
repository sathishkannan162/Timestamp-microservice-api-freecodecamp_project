// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// time microservice
// when input is empty , returns current time
app.get("/api/", function (req, res) {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

app.get("/api/:date", function (req, res) {
  let milliSecondsRegex = /^\d+$/;
  let DateRegex = /^\d+$|\d{4}-\d{2}-\d{2}/;
  // checks whether input is invalid
  if (!DateRegex.test(req.params.date)) {
    res.json({ error: "Invalid date" });
  } 
  else {
    if (milliSecondsRegex.test(req.params.date)) {
      req.params.date = Number(req.params.date);
    }
    let date = new Date(req.params.date);
    res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
