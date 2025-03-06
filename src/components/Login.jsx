import React, { useState } from "react";
import logo1 from "../assets/Logo1.png";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  getBusinessConfig,
} from "../firebase/FirestoreFunctions";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user !== null) {
        const businessConfig = await getBusinessConfig(user.uid)

        if (businessConfig !== null) {
          navigate("/"); // business config exists for this user so go to dashboard (home)
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
  return (
    <div className="relative flex h-screen w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>

      <div className="relative w-1/2 flex items-center justify-center">
        <img src={logo1} alt="Login logo" className="w-48 h-auto" />
      </div>

      <div className="relative w-1/2 backdrop-blur-[4px] flex items-center justify-center shadow-xl bg-rgba(255, 255, 255, 1)">
        <div className="flex flex-col">
          <button
            onClick={handleGoogleSignIn}
            className="text-black hover:opacity-50 font-[\'Plus Jakarta Sans\'] font-semibold text-xl h-12 w-60 tracking-widest border-logo-blue border-1 m-3 rounded-xl opacity-100"
          >
            Sign Up
          </button>
          <button
            onClick={handleGoogleSignIn}
            className=" bg-logo-blue hover:opacity-50 text-white font-semibold text-xl font-[\'Plus Jakarta Sans\'] tracking-widest font-xl h-12 w-60 m-3 rounded-xl opacity-100"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
