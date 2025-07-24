import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../navbar/assets/Logo.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onAddNote }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className={`
            invisible md:visible
            navbar fixed
            bg-sidebar-clr  
            rounded-xl 
            shadow-lg 
            w-24 
            h-[90%]
            m-14 
            transition-transform 
            duration-500 
            ease-in-out 
            flex flex-col
            justify-between
            items-center
            ${isVisible ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="navbar__logo mt-10  flex justify-center items-center">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-full center" />
      </div>
      <nav className="navbar__nav mt-0 flex-col flex items-center">
        <div className="navIndicator justify-start flex flex-row">
          <FontAwesomeIcon
            icon={faHome}
            className="navbar__nav__link size-7 mb-4 py-2.5 px-4 rounded transition duration-200 hover:bg-custom-rose hover:text-black text-white"
          />
        </div>
        <FontAwesomeIcon
          icon={faPlus}
          onClick={onAddNote}
          className="navbar__nav__link size-7 mb-4 py-2.5 px-4 rounded transition duration-200 hover:bg-custom-rose hover:text-black text-white"
        />
      </nav>

      <FontAwesomeIcon
        icon={faSignOutAlt}
        className="navbar__nav__link flex justify-center items-center size-7 mb-4 py-2.5 px-4 rounded transition duration-200 hover:bg-custom-rose hover:text-black text-white "
        onClick={handleLogout}
      />
    </div>
  );
}
