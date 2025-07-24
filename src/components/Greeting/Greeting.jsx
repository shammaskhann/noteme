import React from "react";

export default function Greeting({ name }) {
  return (
    <div className="greet flex flex-col items-start justify-start w-full">
      <h1 className=" text-2xl md:text-4xl text text-black font-ubuntu font-medium dark:text-red-300">
        Hello, {name}! 👋🏼
      </h1>
      <h2 className="text-lg md:text-2xl text-gray-500 font-ubuntu dark:text-gray-400">
        {/* All your notes are here, in one place! */}
        All your notes are here, in one place!
      </h2>
    </div>
  );
}
