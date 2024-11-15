import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Grp204WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    forecast: [],
    error: false,
  });

  // Function to format the current date
  const toDateFunction = () => {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août',
      'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDate = new Date();
    return `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  // Function to fetch weather data and forecast
  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setInput('');
      setWeather({ ...weather, loading: true });

      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
      const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

      try {
        // Fetch current weather
        const currentRes = await axios.get(url, {
          params: {
            q: input,
            units: 'metric',
            appid: apiKey,
          },
        });

        // Fetch 5-day forecast
        const forecastRes = await axios.get(forecastUrl, {
          params: {
            q: input,
            units: 'metric',
            appid: apiKey,
          },
        });

        // Update weather and forecast data
        setWeather({
          data: currentRes.data,
          forecast: forecastRes.data.list.filter((_, index) => index % 8 === 0), // Get forecast data for every 8th entry (12 hours apart)
          loading: false,
          error: false,
        });

      } catch (error) {
        setWeather({ ...weather, data: {}, forecast: [], error: true });
        setInput('');
      }
    }
  };

  return (
    <div className="App">
      <h1 className="app-name">Application Météo grp204</h1>
      
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Entrez le nom de la ville..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
      </div>
      
      {/* Loading Spinner */}
      {weather.loading && (
        <Oval type="Oval" color="black" height={100} width={100} />
      )}

      {/* Error Message */}
      {weather.error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span>Ville introuvable</span>
        </div>
      )}

      {/* Weather Information */}
      {weather.data && weather.data.main && (
        <div className="weather-info">
          <h2>{weather.data.name}, {weather.data.sys.country}</h2>
          <span>{toDateFunction()}</span>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
            alt={weather.data.weather[0].description} 
          />
          <p>{Math.round(weather.data.main.temp)}°C</p>
          <p>Vitesse du vent : {weather.data.wind.speed} m/s</p>
        </div>
      )}

     
    </div>
  );
}

export default Grp204WeatherApp;

