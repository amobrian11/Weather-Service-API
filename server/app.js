//These import necessary modules and set some initial variables.
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;    // Express server port

const API_KEY = "bb54c3eae863f851c548d6384e3f1b89"; // Our Api Key.
const URL = "https://api.openweathermap.org/data/2.5/"; //Api call URL.

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
app.get('/getWeatherInfo/post/', async (req, resp) => {                                 // This is just the default route, we can change it to whatever we like (/index).
    //const code = req.query.city;                             // <---------------------  This
    const code = "0081";                                          // <---- Replace this  with ^^ once we have the react page up and running. 0081 is Just the postal code of pretoria that I used in testing.
    let result;
    try {
        result = await axios.get(URL + "weather?q=" + code + "&appid=" + API_KEY + "&units=metric"); // Uses postal code to make API call and saves data as "results" Url will look simmilar to : https://api.openweathermap.org/data/2.5/weather?q=0081&appid=bb54c3eae863f851c548d6384e3f1b89&units=metric
        resp.json(result.data);                                                                      // Returns the results.                                                                                                                        ^^^^Postal code here       ^^^^Api Key here
    } catch (err) {
        console.error(`failed postal api due to ${err.message}`);                                      // Prints error if API call fails + error code.
    }
    
});


//Starts the express server.
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})



