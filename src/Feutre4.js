import React from 'react';

function Feutre4({ onDetectLocation }) {
  return (
    <div className="location-detection">
      <button onClick={onDetectLocation} className="detect-location-button">
        Détecter ma position
      </button>
    </div>
  );
}

export default Feutre4;
