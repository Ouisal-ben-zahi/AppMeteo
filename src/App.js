import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import Forecast from './Feutre1';
import FavoriteCities from './Feutre2';
import Feutre4 from './Feutre4'; // Import the new Feutre4 component

function Grp204WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    forecast: [],
    error: false,
  });
  const [favorites, setFavorites] = useState([]);

  // Load favorite cities from localStorage on initial load
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Automatically detect user location on initial load
  useEffect(() => {
    detectLocation();
  }, []);

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
  const search = async (query, isCoordinates = false) => {
    setWeather({ ...weather, loading: true });

    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

    try {
      // Fetch current weather
      const currentRes = await axios.get(url, {
        params: isCoordinates
          ? { lat: query.lat, lon: query.lon, units: 'metric', appid: apiKey }
          : { q: query, units: 'metric', appid: apiKey },
      });

      // Fetch 5-day forecast
      const forecastRes = await axios.get(forecastUrl, {
        params: isCoordinates
          ? { lat: query.lat, lon: query.lon, units: 'metric', appid: apiKey }
          : { q: query, units: 'metric', appid: apiKey },
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
    }
  };

  // Function to detect user's location
  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          search({ lat: latitude, lon: longitude }, true);
        },
        () => {
          alert('Impossible de détecter votre localisation. Veuillez entrer une ville manuellement.');
        }
      );
    } else {
      alert('La géolocalisation n’est pas supportée par votre navigateur.');
    }
  };

  // Add city to favorites and update localStorage
  const addToFavorites = () => {
    if (input && !favorites.includes(input)) {
      const updatedFavorites = [...favorites, input];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Select a favorite city and load its weather data
  const selectFavoriteCity = (cityName) => {
    setInput(cityName);
    search(cityName); // Directly call search with the city name
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
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addToFavorites}>Ajouter aux favoris</button> {/* Add to favorites */}
      </div>

      {/* Feutre4 Component for Location Detection */}
      <Feutre4 onDetectLocation={detectLocation} />

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

      {/* 5-Day Forecast */}
      {weather.forecast.length > 0 && (
        <Forecast forecast={weather.forecast} />
      )}

      {/* Display Favorite Cities */}
      <FavoriteCities 
        favorites={favorites} 
        selectFavoriteCity={selectFavoriteCity} 
      />
    </div>
  );
}

export default Grp204WeatherApp;
