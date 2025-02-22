import React from "react";
import { Box, Card, CardMedia, CardContent, Typography, ToggleButton, ToggleButtonGroup, } from "@mui/material";
import Template1 from "./templates/Template1";
import backgroundImg from "../assets/template_bg_img.png"
import logoImg from "../assets/template_logo.png"
import productImg from "../assets/ProductImageTest.png"
import {CircularProgress} from "@mui/material";
import { businessConfig } from "../pages/Creator";

const FlyerEditor = ({ setMediaMode, mediaModes, mediaMode, status, campaignDetails, isMobile, switchToVertical }) => {
    const handleMediaChange = (event, newAlignment) => {
		setMediaMode(newAlignment);
	};

    return (
        <div className={`relative ${switchToVertical === false && isMobile === false ? "h-full w-2/3" : "flex-grow-5 p-10"} flex ${switchToVertical === false ? "py-10 justify-center" : ""} overflow-auto bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px]`}>
            
            {/* div below creates the grid of circles using a background image */}
            {/* <div className={`absolute ${showFlyer === "loading" ? `opacity-30` : "opacity-75"} z-0 inset-0 bg-[radial-gradient(circle,_gray_3%,_transparent_5%)] bg-[length:50px_50px]`}></div> */}

            {status === "LOADING" && 
                <CircularProgress 
                    className="self-center mx-auto" 
                    size={25} 
                    thickness={5}
                />
            }

            <ToggleButtonGroup
                color="primary"
                value={mediaMode}
                exclusive
                onChange={handleMediaChange}
                className="self-start bg-white"
            >
                {mediaModes.map((mode) => 
                    <ToggleButton key={mode} value={mode} >{mode}</ToggleButton>
                )}
            </ToggleButtonGroup>

            {status === "DEFAULT" && campaignDetails !== null &&  // show flyer if not loading and campaignDetails are ready
                <Template1 
                    isMobile={isMobile}
                    callToAction={campaignDetails.call_to_action}
                    switchToVertical={switchToVertical}
                    campaignTitle={campaignDetails.campaign_title} 
                    background={backgroundImg} 
                    logo={logoImg} 
                    discount={campaignDetails.discount}
                    campaignDetail={campaignDetails.campaign_detail}
                    campaignPeriod={campaignDetails.campaign_period} 
                    productImage={productImg} 
                    website={businessConfig.business_details.web_url} 
                    phoneNumber={businessConfig.business_details.phone} 
                    address={businessConfig.business_details.address}
                    fontStyleProp=""
                />
            }
        </div>
    );
};

export default FlyerEditor;