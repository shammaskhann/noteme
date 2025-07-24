import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { API } from "../../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginOptionsSection({ logo, googlesvg }) {
  const navigate = useNavigate();
  // Handler for Google Sign-In
  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = API.googleAuth;
  };

  let [username, setUsername] = useState("");

  const handleAnonymousSignIn = () => {
    // Redirect to backend Anonymous Sign-In endpoint
    localStorage.setItem("token", "anonymous");
    localStorage.setItem("username", username);
    navigate("/loading");
  };

  return (
    <div className="w-full md:w-1/2 px-4 md:px-20 flex flex-col items-center justify-center space-y-6">
      <img src={logo} alt="Logo" className="w-24 md:w-auto mb-2" />
      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center text-white px-6 py-3 rounded-lg shadow-md hover:bg-custom-red-600 transition duration-300 font-ubuntu bg-custom-red-500 w-full md:w-3/4"
      >
        <img src={googlesvg} alt="Google Logo" className="w-6 h-6 mr-2" />
        Sign in with Google
      </button>
      {/* Divider with center text or*/}
      <div className="flex items-center justify-center w-full md:w-3/4">
        <div className="py-4 w-full flex flex-row items-center justify-center">
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>
          <span className="text-gray-500 dark:text-gray-400 px-4">or</span>
          <div className="w-full h-[1px] bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      {/* Username input and Sign Up Button */}
      <div className="flex flex-col items-center justify-center w-full md:w-3/4 space-y-4">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your username"
          className="w-full p-2 rounded-lg border border-gray-500 dark:border-gray-700 text-gray-500 dark:text-gray-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-lg font-ubuntu"
        />
        <button
          className="flex items-center justify-center w-full text-white text-lg font-bold px-6 py-3 rounded-lg shadow-md hover:bg-custom-green-hover transition duration-300 font-ubuntu bg-custom-green"
          onClick={handleAnonymousSignIn}
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default LoginOptionsSection;
