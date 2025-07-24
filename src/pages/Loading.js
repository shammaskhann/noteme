import "../App.css";
import logo from "../assets/images/Logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../models/User";
import { API, fetchNotes } from "../api";

function Loading() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((old) => {
        if (old < 90) return old + 10;
        clearInterval(interval);
        return old;
      });
    }, 100);
    console.log("Loading - Fetching user info token");
    const token = localStorage.getItem("token");

    console.log("Loading - Token:", token);
    if (token) {
      if (token === "anonymous") {
        navigate("/home", {
          state: {
            user: { username: localStorage.getItem("username") ?? "Anonymous" },
            notes: [],
          },
        });
        return;
      }
      console.log("Loading - Fetching user info");
      fetch(API.getUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(async (data) => {
          setProgress(100);
          setTimeout(async () => {
            const user = User.fromJson(data);
            console.log("Loading - User:", user.toString());
            // Fetch notes for the user
            let notes = [];
            try {
              notes = await fetchNotes(token);
            } catch (e) {
              console.log("Failed to fetch notes", e);
            }
            // Pass notes to Home
            navigate("/home", { state: { user, notes } });
          }, 300);
        })
        .catch(() => {
          alert("Failed to load user info");
          navigate("/");
        });
    } else {
      navigate("/");
    }
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="loading-page flex flex-col items-center justify-center min-h-screen">
      <img src={logo} alt="Logo" className="logo mb-8" />
      <div className="w-2/3 h-3 rounded-full bg-[#FDBAA3] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "#3C3D43" }}
        ></div>
      </div>
    </div>
  );
}

export default Loading;
