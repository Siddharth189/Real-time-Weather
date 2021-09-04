const express = require("express");
const port = 3000;
const https = require("https");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const appid = "291cf5ec0ac346a4e717881ac8d25a37";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit+"";
    https.get(url, function (response) {
        
        response.on("data", function (data) {
            
            const weatherData = JSON.parse(data);
            
            const icon =  weatherData.weather[0].icon;
            console.log(icon);
            const url = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            
            console.log(weatherData.main.temp)
            res.write("<h1>The temperature in "+ query + " is: " + weatherData.main.temp +"</h1>");
            res.write("<h1>" + weatherData.weather[0].description+ "</h1>");
            res.write("<img src="+ url +" >")
            res.send();
        });
    })
})

app.listen(port, function (err) {
    if(err){
        console.log("Error: " + err);
        return ;
    }
    console.log("Yupp! the server is up and running on port: " + port);
})