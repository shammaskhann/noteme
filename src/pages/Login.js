import "../App.css";
import loginMockImage from "../assets/images/loginMock.png";
import logo from "../assets/images/Logo.png";
import googlesvg from "../assets/images/google.svg";
import LoginMockupSection from "../components/Login/LoginMockupSection";
import LoginOptionsSection from "../components/Login/LoginOptionsSection";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function Login() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (token === "anonymous") {
        localStorage.clear();
        navigate("/");
        return;
      }
      if (!token) {
        setCheckingAuth(false);
        return;
      }
      try {
        const res = await fetch(API.getUser, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          // Token is valid, redirect to loading
          navigate("/loading");
        } else {
          // Invalid/expired token
          localStorage.removeItem("token");
          setCheckingAuth(false);
        }
      } catch (e) {
        localStorage.removeItem("token");
        setCheckingAuth(false);
      }
    };
    checkToken();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-lg font-semibold">
          Checking authentication...
        </span>
      </div>
    );
  }

  return (
    <div className="login-page bg-white min-h-screen flex flex-col items-center justify-center">
      {/* main content: responsive flex direction */}
      <div className="flex flex-col md:flex-row items-center justify-evenly w-full max-w-8xl mx-auto space-y-8 md:space-y-0 md:space-x-8">
        <LoginMockupSection loginMockImage={loginMockImage} />
        <LoginOptionsSection logo={logo} googlesvg={googlesvg} />
      </div>
    </div>
  );
}

export default Login;
