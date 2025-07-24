import "../App.css";
import Navbar from "../components/navbar/navbar";
import MobileAppBar from "../components/MobileAppBar/MobileAppBar";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faTrash,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import Greeting from "../components/Greeting/Greeting";
import Notes from "../components/Notes/notes";
import NotesModel from "../models/Notes";
import { fetchNotes, createNote, updateNote, deleteNote } from "../api";
import { useLocation } from "react-router-dom";
import DeletingModeGreet from "../components/Greeting/DeletingModeGreet";
import { useNavigate } from "react-router-dom";

function Home() {
  //Initializing Variables
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;
  const initialNotes = location.state?.notes || [];
  console.log("initialNotes", initialNotes);
  const [darkMode, setDarkMode] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pendingNoteColor, setPendingNoteColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deletingMode, setDeletingMode] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    function handleBeforeUnload() {
      if (localStorage.getItem("token") === "anonymous") {
        localStorage.clear();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const postColors = [
    { name: "yellow", class: "bg-post-color-yellow" },
    { name: "orange", class: "bg-post-color-orange" },
    { name: "lilac", class: "bg-post-color-lilac" },
    { name: "green", class: "bg-post-color-green" },
    { name: "cyan", class: "bg-post-color-cyan" },
  ];

  // // Fetch notes on mount only if not provided by navigation
  useEffect(() => {
    if (notes.length > 0) return; // Already have notes from navigation
    const loadNotes = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        console.log("token", token);
        const fetchedNotes = await fetchNotes(token);
        console.log("fetchedNotes", fetchedNotes);
        setNotes(fetchedNotes);
      } catch (err) {
        setError("Failed to load notes");
      } finally {
        setLoading(false);
      }
    };
    if (user && user.token) {
      loadNotes();
    }
  }, [user, notes.length]);

  const addNote = async (color) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (token === "anonymous") {
        if (localStorage.getItem("username") === null) {
          localStorage.clear();
          navigate("/");
        }
        //let date = new Date().toISOString();
        let newNote = NotesModel.fromJson({
          content: "New Note",
          color,
          updatedAt: null,
          _id: "anonymous",
          username: localStorage.getItem("username") ?? "Anonymous",
        });
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setShowColorPicker(false);
        setPendingNoteColor(null);
        return;
      }
      console.log("token", token);
      const newNote = await createNote(token, {
        content: "New Note",
        color,
      });
      console.log("newNote", newNote);
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setShowColorPicker(false);
      setPendingNoteColor(null);
    } catch (err) {
      console.log(err);
      setError("Failed to add note");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNoteClick = () => {
    setShowColorPicker(true);
  };

  const updateNoteHandler = async (id, note) => {
    if (localStorage.getItem("token") === "anonymous") {
      setNotes((prevNotes) => prevNotes.map((n) => (n._id === id ? note : n)));
      return;
    }
    console.log(" ==> updateNote", id, note);
    console.log(" ==> Setting Loading True");
    setLoading(true);
    setError("");
    try {
      console.log(" ==> Updating Note");
      const token = localStorage.getItem("token");
      const updatedNote = await updateNote(token, id, note);
      console.log(" ==> Updated Note", updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === id ? updatedNote : n))
      );
      console.log(" ==> Notes", notes);
    } catch (err) {
      console.log(" ==> Error", err);
      setError("Failed to update note");
    } finally {
      console.log(" ==> Setting Loading False");
      setLoading(false);
    }
  };

  const handleTrashClick = () => {
    setDeletingMode((prev) => !prev);
    setNoteToDelete(null);
  };

  const handleDeleteRequest = (note) => {
    console.log(" ==> handleDeleteRequest", note);
    if (deletingMode) setNoteToDelete(note);
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return;

    if (localStorage.getItem("token") === "anonymous") {
      setNotes((prevNotes) =>
        prevNotes.filter((n) => n._id !== noteToDelete._id)
      );
      setNoteToDelete(null);
      setDeletingMode(false);
      return;
    }
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const res = await deleteNote(token, noteToDelete._id);
      setNotes((prevNotes) =>
        prevNotes.filter((n) => n._id !== noteToDelete._id)
      );
      // alert(res.message || "Note deleted");
      setNoteToDelete(null);
      setDeletingMode(false);
    } catch (err) {
      setError("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setNoteToDelete(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    //Main Container
    <div className="App min-h-screen flex flex-col items-start md:justify-start bg-white dark:bg-custom-gray-800">
      {/* Navbar */}
      <Navbar onAddNote={handleAddNoteClick} />
      <div className="block md:hidden w-full">
        <MobileAppBar
          onAddNote={handleAddNoteClick}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
      {/* Theme Mode Button (desktop only) */}
      <button
        className="hidden md:block themeMode text-custom-gray-300 md:text-black font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:scale-105 absolute top-4 right-4 dark:text-white md:hover:bg-custom-rose"
        onClick={toggleDarkMode}
      >
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
      {/* Loader */}
      {/* Error */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-custom-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Loading...
            </span>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {error}
        </div>
      )}
      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-custom-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Choose a color for your note
            </h2>
            <div className="flex gap-4 mb-4">
              {postColors.map((color) => (
                <button
                  key={color.name}
                  className={`w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition ${color.class}`}
                  onClick={() => addNote(color.name)}
                  aria-label={`Choose ${color.name}`}
                />
              ))}
            </div>
            <button
              className="mt-2 px-4 py-2 rounded bg-custom-gray-300 dark:bg-custom-gray-900 text-white hover:bg-custom-rose"
              onClick={() => setShowColorPicker(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {noteToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-custom-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <span className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Are you sure you want to delete this note?
            </span>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 rounded bg-red-500 text-white"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-300"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mainBodyContainer pl-4 pt-4 md:pt-[2%] md:pl-[13%] flex w-full">
        {deletingMode ? (
          <DeletingModeGreet />
        ) : (
          <Greeting name={user.username} />
        )}
      </div>
      <div className="notesContainer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   md:pl-[12%] md:pt-[1%] pr-10">
        {notes.filter(Boolean).map((note, index) => (
          <Notes
            key={note._id || index}
            note={note}
            onUpdate={updateNoteHandler}
            deletingMode={deletingMode}
            onDeleteRequest={handleDeleteRequest}
          />
        ))}
      </div>
      {
        <div className="trashContainer fixed bottom-4 right-4 bg-custom-gray-300 dark:bg-custom-gray-700 p-4 rounded-full">
          <FontAwesomeIcon
            icon={deletingMode ? faTrashCan : faTrash}
            className="text-white text-3xl"
            onClick={handleTrashClick}
          />
        </div>
      }
    </div>
  );
}

export default Home;
