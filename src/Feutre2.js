// FavoriteCities.js
import React from 'react';

function FavoriteCities({ favorites, selectFavoriteCity }) {
  return (
    <div className="favorite-cities">
      <h3>Villes favorites</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((city, index) => (
            <li key={index} onClick={() => selectFavoriteCity(city)}>
              {city}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune ville favorite ajoutée.</p>
      )}
    </div>
  );
}

export default FavoriteCities;
