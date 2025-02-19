import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";

const FlyerEditor = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* div below creates the grid of circles using a background image */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>
        </div>
    );
};

export default FlyerEditor;