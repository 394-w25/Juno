import React, { useState } from "react";

// SOCIAL MEDIA TEMPLATE

function Template2({ callToAction, isMobile, switchToVertical, campaignTitle, background, logo, discount, campaignDetail, campaignPeriod, productImage, website, phoneNumber, address, fontStyleProp }) {
    return(
        <div
            className="absolute w-[864px] h-[1080px]"
            style={isMobile ? { transform: "scale(0.55)", transformOrigin: "top left" } : switchToVertical ? {transform: "scale(0.75)", transformOrigin: "top left"} : {}}
        >

        </div>
    )
}

export default Template2;