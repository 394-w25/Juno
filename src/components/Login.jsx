import React, { useState } from "react";
import logo1 from "../assets/Logo1.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  getBusinessConfig,
} from "../firebase/FirestoreFunctions";
import { useAuthContext } from "./AuthContext";
import { updateIsGuest } from "../firebase/AuthFunctions";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setIsGuest } = useAuthContext()

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user !== null) {
        const businessConfig = await getBusinessConfig(user.uid) // fetch business config from db

        if (businessConfig !== null) {
          navigate("/operator"); // business config exists for this user so go to dashboard (home)
        } else {
          navigate("/onboarding"); // go to onboarding
        }
      }
      else {
        console.error("Error during sign-in: user is null for some reason")
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    setIsGuest(true) // update state variable
    updateIsGuest(true) // update local storage
    navigate("/onboarding")
  }

  return (
    <div className="relative flex h-screen w-full bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px]">

      <div className="relative w-1/2 flex items-center justify-center">
        <img src={logo1} alt="Login logo" className="w-48 h-auto" />
      </div>

      <div 
        className="relative w-1/2 flex items-center justify-center shadow-xl "
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Adjust transparency
        }}
      >
        <div className="flex flex-col">
          <button
            onClick={handleGoogleSignIn}
            className="text-black bg-white hover:opacity-50 font-[\'Plus Jakarta Sans\'] font-semibold text-xl h-12 w-60 tracking-widest border-logo-blue border-1 m-3 rounded-xl opacity-100"
          >
            Sign Up
          </button>
          <button
            onClick={handleGoogleSignIn}
            className=" bg-logo-blue hover:opacity-50 text-white font-semibold text-xl font-[\'Plus Jakarta Sans\'] tracking-widest font-xl h-12 w-60 m-3 rounded-xl opacity-100"
          >
            Login
          </button>

          <button 
            onClick={handleContinueAsGuest}
            className="text-gray-400 font-normal hover:opacity-50" 
          >
            <i>Continue as guest</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
