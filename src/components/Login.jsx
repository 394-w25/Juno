import React, { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import logo1 from "../assets/Logo1.png";

const Login = () => {
  return (
    <div className="relative flex h-screen w-full">
      {/* <div className="relative w-full min-h-screen flex items-center justify-center"> */}
      {/* div below creates the grid of circles using a background image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>

      <div className="relative w-1/2 flex items-center justify-center">
        <img src={logo1} alt="Login logo" className="w-48 h-auto" />
      </div>

      <div className="relative w-1/2 backdrop-blur-[4px] flex items-center justify-center bg-white shadow-xl opacity-75">
        <div className="flex flex-col">
          <button className="text-black">Sign Up</button>
          <button className="w-40 h-10 rounded-full bg-logo-blue text-white !opacity-100">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
