import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GoogleCallback from "./pages/GoogleCallback";
import Loading from "./pages/Loading";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/google/callback" element={<GoogleCallback />} />
      </Routes>
    </Router>
  );
}

export default App;

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   const [notes, setNotes] = useState([
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic!  😍",
//       "10",
//       "Feb",
//       "2022",
//       "yellow"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic! 😍",
//       "11",
//       "Mar",
//       "2022",
//       "orange"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic! 😍",
//       "12",
//       "Apr",
//       "2022",
//       "lilac"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic! 😍",
//       "13",
//       "Jun",
//       "2022",
//       "green"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic! 😍",
//       "14",
//       "Nov",
//       "2022",
//       "cyan"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic!  😍",
//       "10",
//       "Feb",
//       "2022",
//       "yellow"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic! 😍",
//       "11",
//       "Mar",
//       "2022",
//       "orange"
//     ),
//     new NotesModel(
//       "This is how a Note on Note.me looks like! Very simple, clean and aesthetic! 😍",
//       "12",
//       "Apr",
//       "2022",
//       "lilac"
//     ),
//   ]);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   return (
//     <div className="App min-h-screen flex flex-col items-start md:justify-start bg-white dark:bg-custom-gray-800">
//       <Navbar />
//       <div className="block md:hidden w-full">
//         <MobileAppBar />
//       </div>
//       <button
//         className="themeMode text-custom-gray-300 md:text-black font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:scale-105 absolute top-4 right-4 dark:text-white md:hover:bg-custom-rose"
//         onClick={toggleDarkMode}
//       >
//         <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
//       </button>
//       <div className="mainBodyContainer pl-4 pt-4 md:pt-[2%] md:pl-[13%] flex w-full">
//         <Greeting />
//       </div>
//       <div className="notesContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:pl-[12%] md:pt-[1%] pr-10">
//         {notes.map((note, index) => (
//           <Notes note={note} />
//         ))}
//       </div>
//       {
//         <div className="trashContainer fixed bottom-4 right-4 bg-custom-gray-300 dark:bg-custom-gray-700 p-4 rounded-full">
//           <FontAwesomeIcon icon={faTrash} className="text-white text-3xl" />
//         </div>

//         //: null}
//       }
//     </div>
//   );
// }
