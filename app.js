const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const appId = "5a5d6b7e3c30670f6ab936935be147a1";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=metric";
  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      console.log(data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      res.write("the temperate is " + temp + " in " + req.body.cityName);
      res.write("the weather is currently " + weatherDescription);
      res.send();

    });

  });
  console.log(req.body.cityName);
});
// response.on("data",function(data){


// });





app.listen(3000, function() {
  console.log("port is running on 3000");
});
