// const { log } = require("console");
const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //   res.sendFile(__dirname + "/index.html");
  const city = req.body.CityName;
  const apiKey = "4f35d5007073dac297facdd4a67163ce";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);

      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      const temp = weatherData.main.temp;
      console.log(temp);

      const description = weatherData.weather[0].description;
      console.log(description);

      //   res.write("<p>This is the weather description " + description + "</p>");
      res.write(
        "<h1>The temprature in " +
          req.body.CityName +
          " is " +
          temp +
          "degree celcius</h1>"
      );
      res.write("<img src=" + iconUrl + "> ");
      res.send();
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("server running at 3000");
});
