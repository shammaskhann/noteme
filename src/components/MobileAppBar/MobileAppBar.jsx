import React, { useState, useEffect } from "react";
import Logo from "../navbar/assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function MobileAppBar({ onAddNote, darkMode, toggleDarkMode }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`flex flex-row items-center justify-between p-4 bg-custom-gray-800 shadow-xl transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } rounded-b-lg`}
    >
      <div className="logoContainer flex flex-row items-center justify-start">
        <img src={Logo} alt="logo" className="w-10 h-10 rounded-full" />
        <div className="text-2xl ml-3 font-ubuntu font-medium text-red-300">
          Note.me
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <button
          onClick={toggleDarkMode}
          className="flex justify-center items-center size-7 p-2 rounded-full transition duration-200 hover:bg-custom-rose hover:text-black text-white bg-transparent border-none"
          aria-label="Toggle Theme"
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} size="lg" />
        </button>
        <button
          onClick={onAddNote}
          className="flex justify-center items-center size-7 p-2 rounded-full transition duration-200 hover:bg-custom-rose hover:text-black text-white bg-transparent border-none"
          aria-label="Add Note"
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
      </div>
    </div>
  );
}

export default MobileAppBar;
