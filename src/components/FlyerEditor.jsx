import React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Template1 from "./templates/Template1";
import backgroundImg from "../assets/template_bg_img.png"
import logoImg from "../assets/template_logo.png"
import productImg from "../assets/ProductImageTest.png"
import {CircularProgress} from "@mui/material";

const FlyerEditor = ({ showFlyer, isMobile, switchToVertical }) => {

    return (
        <div className={`relative w-full ${switchToVertical === false && isMobile === false ? "h-full" : "flex-grow-5 p-10"} flex ${switchToVertical === false ? "py-10 justify-center" : ""} overflow-auto bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px]`}>
            
            {/* div below creates the grid of circles using a background image */}
            {/* <div className={`absolute ${showFlyer === "loading" ? `opacity-30` : "opacity-75"} z-0 inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px]`}></div> */}

            {showFlyer === "loading" && 
                <CircularProgress 
                    className="self-center mx-auto" 
                    size={25} 
                    thickness={5}
                />
            }
            {showFlyer === "true" &&  
                <Template1 
                    isMobile={isMobile}
                    switchToVertical={switchToVertical}
                    campaignTitle="SAY IT WITH FLOWERS!" 
                    background={backgroundImg} 
                    logo={logoImg} 
                    discount="30% OFF" 
                    campaignDetail="On this special day for mothers, we would like to help you celebrate her with a unique bouquet to show your appreciation" 
                    campaignPeriod="May 05-12 2025" 
                    productImage={productImg} 
                    website="https://furniture-flow.web.app" 
                    phoneNumber="(872)3149631" 
                    address="1720 Sherman Ave Evanston, IL 60201" 
                    fontStyleProp=""
                />
            }
        </div>
    );
};

export default FlyerEditor;