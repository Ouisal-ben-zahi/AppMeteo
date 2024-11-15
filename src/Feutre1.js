import React from 'react';

function Forecastt({ forecast }) {
  const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return (
    <div className="forecast">
      <h2>Prévisions Météo sur 5 Jours</h2>
      <div className="forecast-container">
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = weekDays[date.getDay()];

          return (
            <div key={index} className="forecast-card">
              <h3>{dayName}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>{Math.round(day.main.temp)}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecastt;
