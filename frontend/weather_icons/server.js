//These import necessary modules and set some initial variables.
const express = require('express');
const axios = require('axios');
const app = express();
const port = 1212;    // Express server port

const API_KEY = "bb54c3eae863f851c548d6384e3f1b89"; // Our Api Key.
const URL = "https://api.openweathermap.org/data/2.5/"; //Api call URL.

//Routes
app.get('/', async (req, resp) => {                                //This is just the default route, we can change it to whatever we like (/index).
    //const code = req.query.postcode;                               <---------------------  This
    const code = "0081";                                          // <---- Replace this  with ^^ once we have the react page up and running. 0081 is Just the postal code of pretoria that I used in testing.
    let result;
    try {
        result = await axios.get(URL + "weather?q=" + code + "&appid=" + API_KEY + "&units=metric"); // Uses postal code to make API call and saves data as "results" Url will look simmilar to : https://api.openweathermap.org/data/2.5/weather?q=0081&appid=bb54c3eae863f851c548d6384e3f1b89&units=metric
        resp.json(result.data);                                                                      // Returns the results.                                                                                                                        ^^^^Postal code here       ^^^^Api Key here
    } catch (err) {
        console.error(`failed city api due to ${err.message}`);                                     // Prints error if API call fails + error code.
    }
    
});

var getData = function (data){   
    var location= data.name;
    var temp=data.main.temp.toFixed();
    var desc =data.weather[0].description;
    var minTemp = data.main.temp_min.toFixed();
    var maxTemp = data.main.temp_max.toFixed();

    //images changes depending on the temp
    if(temp > 23){
      $('.imageWrapper').addClass('wrapper_hot');
      }else if
      (temp > 9 && temp < 22){
      $('.imageWrapper').addClass('wrapper_normal');
      }else if
      (temp < 8){
      $('.imageWrapper').addClass('wrapper_cold');
      }
      SwitchWI(location, temp, desc, minTemp, maxTemp)
  }

  //Displays returned info in the Dom
  var SwitchWI = function(location, temp, desc, minTemp, maxTemp){
    // console.log('inside manipulateDom');
     $('#location').html(location);
     $('#temp').html(temp + "&deg");
     $('#desc').html(desc);
     $('#minTemp').html(minTemp + "&deg");
     $('#maxTemp').html(maxTemp + "&deg");
   }

//Starts the express server.
app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
})



