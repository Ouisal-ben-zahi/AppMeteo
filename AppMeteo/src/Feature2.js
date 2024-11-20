// FavoriteCities.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const FavoriteCities = ({
  favorites,
  selectFavoriteCity,
  removeFromFavorites,
}) => {
  return (
    <div className="favorite-cities">
      <h3>Villes Favorites</h3>
      {favorites.length === 0 ? (
        <p>Aucune ville favorite ajoutée.</p>
      ) : (
        <ul>
          {favorites.map((city) => (
            <li key={city}>
              <span
                onClick={() => selectFavoriteCity(city)}
                className="favorite-city"
              >
                {city}
              </span>
              <button onClick={() => removeFromFavorites(city)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteCities;
