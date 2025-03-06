import React from "react";
import Navbar from "../components/Navbar";
import { logOut } from "../firebase/AuthFunctions";

const Home = () => {

  return (
    <div className="h-dvh">
      <Navbar /> 
      
      <div className="h-[calc(100vh-70px)] flex justify-center items-center">
        <button onClick={() => logOut()} className="bg-logo-blue py-3 px-4 hover:opacity-50 text-white font-semibold text-xl font-[\'Plus Jakarta Sans\'] tracking-widest rounded-xl opacity-100">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
