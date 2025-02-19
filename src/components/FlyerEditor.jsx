import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Template1 from "./templates/Template1";
import backgroundImg from "../assets/template_bg_img.png"
import logoImg from "../assets/template_logo.png"
import productImg from "../assets/ProductImageTest.png"

const FlyerEditor = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* div below creates the grid of circles using a background image */}
            <div className="absolute z-100 inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px] opacity-75"></div>

            <Template1 campaignTitle="SAY IT WITH FLOWERS!" background={backgroundImg} logo={logoImg} discount="30% OFF" campaignDetail="On this special day for mothers, we would like to help you celebrate her with a unique bouquet to show your appreciation" campaignPeriod="May 05-12 2025" productImage={productImg} website="https://furniture-flow.web.app" phoneNumber="(872)3149631" address="1720 Sherman Ave Evanston, IL 60201" fontStyleProp=""/>
        </div>
    );
};

export default FlyerEditor;