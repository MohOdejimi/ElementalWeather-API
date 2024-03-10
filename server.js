const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config()

const PORT = 8001



let town;

app.get('/search/:city', async (req, res) => {
    try {
        const city = req.params.city
        town = city
        const weatherdata = await fetchweatherData(city)
        res.json(weatherdata)
    } catch(error) {
        res.status(500).json({
            error: 'Internal server error'
        })
    }
}) 

async function fetchweatherData(town) {
    const apiKey = process.env.apikey
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${apiKey}&units=metric`;
    const response = await axios.get(apiUrl)
    const responseData = { ...response.data };

    responseData.sys.country = convertCountryCode(responseData.sys.country) 

    return responseData
}

  // Date Converter 
  function convertToDate(dateString) {
    const date = new Date(dateString);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekday = weekdays[date.getDay()];
    return weekday;
  }



  function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(['en'],{type: 'region'})
    return regionNames.of(country)
  }

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

