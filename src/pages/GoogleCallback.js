import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the full query string
    try {
      const params = new URLSearchParams(window.location.search);
      console.log("window.location.search");
      console.log(window.location.search);
      console.log("params");
      console.log(params.get("token"));
      const token = params.get("token");
      if (token) {
        console.log("token storing in the local storage");
        localStorage.setItem("token", token);
        navigate("/loading");
      }
    } catch (error) {
      alert("Google sign-in failed: " + error.message);
      console.log(error);
      navigate("/");
    }
  }, [navigate]);

  return <div>Signing you in with Google...</div>;
}

export default GoogleCallback;
