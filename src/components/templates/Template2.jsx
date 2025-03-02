import React, { useState } from "react";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PlaceIcon from '@mui/icons-material/Place';

// SOCIAL MEDIA TEMPLATE
const formatPeriod = (timePeriod) => {
    if (timePeriod === null) {
        return ""
    }

    if (timePeriod.start_date === null || timePeriod.end_date === null) {
        return ""
    }

    const start_date = new Date(timePeriod.start_date);
    const end_date = new Date(timePeriod.end_date);

    const formatDate = (date) => {
        const month = date.getUTCMonth() + 1; // Months are zero-indexed
        const day = date.getUTCDate();
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`;
    };

    return `${formatDate(start_date)} - ${formatDate(end_date)}`;
}
function Template2({ callToAction, isMobile, switchToVertical, campaignTitle, background, logo, discount, campaignDetail, campaignPeriod, productImage, website, phoneNumber, address, fontStyleProp }) {
    return (
        <div
          className="absolute left-1/2 top-1/2 overflow-hidden"style={{ width: "1080px", height: "1080px", transform: `translate(-50%, -50%) scale(0.64)`, transformOrigin: "center center"}}
        >
          <img src={background} className="absolute w-full h-full object-contain object-center"/>
          <div className="relative h-full inset-0 flex flex-col justify-between py-10 items-center text-center">
                <div className="flex flex-col items-center gap-8 ">
                    {/* COMPONENT: companyLogo */}
                    <img src={logo} className="w-[180px] h-auto" />

                    {/* COMPONENT: campaignTitle */}
                    <h1 className="text-7xl font-serif font-light uppercase text-[#42311C] w-4/5">{campaignTitle}</h1>

                    {/* COMPONENT: campaignPeriod */}
                    <p className="text-2xl font-black font-serif text-[#42311C]">{formatPeriod(campaignPeriod)}</p>
                </div>
            
                <div className="flex gap-4 flex-col justify-center items-center mb-4">
                    <div className="relative gap-5 bg-white/83 rounded-[3rem] p-10 flex flex-col items-center">
                        {/* COMPONENT: discount */}
                        <p className="relative max-w-[700px] text-[#A6937C] font-serif font-semibold text-9xl text-center">
                        {discount ? discount.toUpperCase() : ""}
                        </p>
                        {/* COMPONENT: campaign details */}
                        <p className="relative max-w-[600px] text-[#665E58] text-4xl font-serif">
                        {campaignDetail}
                        </p>
                    </div>
                </div>
                

                {/* COMPONENT: call to actiion */}
                <div className="rounded-lg p-4 bg-[#8C5C35] text-white text-3xl font-serif px-10 tracking-wider">
                    {callToAction}
                </div>

                {/* CONTACT INFO */}
                <div className="flex flex-col items-center text-[#42311C]">
                    <div className="flex gap-3 items-center">
                        <LocalPhoneIcon className="!text-3xl"/> 
                        <p className="text-3xl">{phoneNumber}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <PlaceIcon className="!text-4xl"/>
                        <div className="text-xl font-extrabold">
                            {address}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
    }
    
    export default Template2;