import React, {useState } from 'react';
import moment from 'moment';
import logo from './logo2.png';
import './App.css';
import '../weather_icons/server';

const App = () => {

  const [cityWeatherData, setCityWeatherData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = async (event) => {
    setSearchTerm(event.target.value);
    if (searchTerm.length >= 4) {
      const response = await fetch(
        `http://localhost:3001/getWeatherInfo/post/?city=${searchTerm}`,
        {
          method: "GET",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          })
        }
      );
      const postData = await response.json();
      setCityWeatherData(postData);
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  };

  

  const showSearchResults = () => {
    if (isSearch) {
      return (
        <div>
          <table className="App-header">
            <thead>
              <td>City </td>
              <td>Country Code </td>
              <td>Current Date </td>
              <td>Current Time </td>
              <td>Current Status</td>
              <td>Temperature</td>
              <td>Pressure</td>
              <td>Humidity</td>
              <td>Cloudiness</td>
              <td>Sunrise</td>
              <td>Sunset</td>
            </thead>
            <tbody className="App-header">
              <tr>
                <td><div>{cityWeatherData?.name}</div></td>
                <td><div>{cityWeatherData?.sys?.country}</div></td>
                <td><div>{moment.unix(cityWeatherData?.dt).format("ll")}</div></td>
                <td><div>{moment.unix(cityWeatherData?.dt).format("h:mm a")}</div></td>
                <td><div>{cityWeatherData?.weather[0]?.description}</div></td>
                <td><div>{cityWeatherData?.main?.temp} Celcius</div></td>
                <td><div>{cityWeatherData?.main?.pressure} hPa</div></td>
                <td><div>{cityWeatherData?.main?.humidity}%</div></td>
                <td><div>{cityWeatherData?.clouds.all}%</div></td>
                <td><div>{moment.unix(cityWeatherData?.sys?.sunrise).format("hh:mm a")}</div></td>
                <td><div>{moment.unix(cityWeatherData?.sys?.sunset).format("hh:mm a")}</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3> Weather Station </h3>
        <img src={logo} className="App-logo" alt="logo" />
        <header ClassName="App-cont">
          <p1>
          Enter a zipcode below to get the current <br></br>
          weather conditions for that area.
        </p1>
          </header>
      <div className="search">
        <input
          type="text"
          placeholder="Search by Postal Code"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <button onclick={handleChange}>Search</button>
      </header>
      
      {isSearch && showSearchResults()}
    </div>
  );
}

export default App;