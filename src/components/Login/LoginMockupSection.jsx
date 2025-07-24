import React from "react";

function LoginMockupSection({ loginMockImage }) {
  return (
    <div className="flex flex-col items-center md:items-center w-full md:w-1/3 px-4 md:px-0">
      <img
        src={loginMockImage}
        alt="Login Mockup"
        className="pb-6 w-3/4 md:w-3/4 mx-auto md:mx-0"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white pb-4 font-ubuntu text-center md:text-left">
        Keep life simple
      </h1>
      <p className="text-gray-600 text-base md:text-lg font-medium dark:text-gray-300 font-ubuntu w-full md:w-3/4 text-center md:text-left">
        Store all your notes in a simple and intuitive app that helps you enjoy
        what is most important in life.
      </p>
    </div>
  );
}

export default LoginMockupSection;
