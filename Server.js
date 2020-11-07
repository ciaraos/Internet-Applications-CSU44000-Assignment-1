//set up path (from example)
const express = require('express')
const app = express()
const port = 3000
const path = require("path")
let publicPath = path.resolve(__dirname, "public")

app.use(express.static(publicPath))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//For API call 
const fetch = require("node-fetch")
const APIkey = "53294bddb483c08e2486b5ace98c50aa";

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/Client.html"))})
app.get("/weather/:location", checkWeather)

//Summary of the weather for the next five days showing: date, city, description, temperature, rainfall, windspeed
//returns JSON of forecast to be printed on screen 
async function checkWeather(req, res) {
    //make API call
    let city = req.params.location
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIkey}`
    let response = await fetch(url)
    let weatherData = await response.json()

    //define variables 
    let what2pack, rain, description, date, feels_like = ''
    let temp, windSpeed = 0
    let forecastArray = {
      umbrella : 'No umbrella needed, yay!',
      temp4packing: '',
      forecastList :[]
    }
    umbrella = 'No umbrella' //set to no as default
    temp4packing = ' ' 

    //parse data 
    for(var index = 0; index < (weatherData.list.length); index++){
        date = weatherData.list[index].dt_txt
        description = weatherData.list[index].weather[0].description
        temp = weatherData.list[index].main.temp
        feels_like = weatherData.list[index].main.feels_like
        rain = checkRain(weatherData.list[index].rain, forecastArray)
        windSpeed = weatherData.list[index].wind.speed;
        what2pack = checkPacking(weatherData.list[index].main.temp, forecastArray)

        forecastArray.forecastList.push(
            {
                Date: date,
                City: city,
                Description: description,
                Temp: temp,
                Feels: feels_like,
                Rainfall: rain,
                Windspeed: windSpeed, 
                Packing: what2pack
            }
        )
    }
    res.json(forecastArray)
}

function checkRain(weatherData, forecastArray){
    //Get mm of rain and convert it to a string
    //Tell user if they should pack an umbrella 
    if(weatherData != undefined){
        if(JSON.stringify(weatherData).substr(6,5) != ''){
            rain = parseFloat((JSON.stringify(weatherData)).substr(6, 5))
        }
        forecastArray.umbrella = 'You should bring an umbrella '
    }
    else{
        rain = 'No rain, yay!'
    }
    return rain
}

function checkPacking(temp, forecastArray){
    //Tell user how to pack for the weather forecast 
    if(temp >= -10 && temp <= 10){
        what2pack = "COLD"
    }
    else if(temp > 10 && temp <= 20){
        what2pack = "WARM"
    }
    else{
        what2pack = "HOT"
    }
    forecastArray.temp4packing = "It looks like it'll be " + what2pack + ", " + " pack accordingly!"
    return what2pack
}