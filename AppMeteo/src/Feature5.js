import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const NightModeToggle = ({ isNightMode, toggleNightMode }) => {
  return (
    <button className="night-mode-toggle" onClick={toggleNightMode}>
      <FontAwesomeIcon icon={isNightMode ? faSun : faMoon} />
    </button>
  );
};

export default NightModeToggle;
