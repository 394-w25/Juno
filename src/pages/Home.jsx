import React from "react";
import Navbar from "../components/Navbar";
import { logOut, setLocalBusinessConfig, updateIsGuest } from "../firebase/AuthFunctions";
import { useAuthContext } from "../components/AuthContext"

const Home = () => {

  const { isGuest, setIsGuest, setBusinessConfig } = useAuthContext()

  const handleLogOut = () => {
    if (isGuest) {
      updateIsGuest(false)
      setLocalBusinessConfig(null)

      setIsGuest(false)
      setBusinessConfig(null)
    }
    else {
      logOut()
    }
  }

  return (
    <div className="h-dvh">
      <Navbar /> 
      
      <div className="h-[calc(100vh-70px)] flex justify-center items-center">
        <button onClick={handleLogOut} className="bg-logo-blue py-3 px-4 hover:opacity-50 text-white font-semibold text-xl font-[\'Plus Jakarta Sans\'] tracking-widest rounded-xl opacity-100">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
