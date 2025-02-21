import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";

export const businessConfig = {
	"flyer_config": {
		"page_size": "A4",
		"orientation": "portrait",
		"media_dimensions": {
			"width": "210mm",
			"height": "297mm"
		},
		"margins": {
			"top": "10mm",
			"bottom": "10mm",
			"left": "10mm",
			"right": "10mm"
		},
		"background": {
			"color": "#FFFFFF",
			"pattern": "gradient-blue",
		},
		"logo": {
			"url": "https://example.com/logo.png",
			"position": "top-left",
			"size": "auto"
		},
		"font_style": {
			"primary": "Open Sans",
			"secondary": "Arial",
			"heading_size": "36px",
			"body_size": "18px",
			"color": "#333333"
		},
		"contact_info": {
			"website": "https://example.com",
			"phone_number": "+1 234 567 890",
			"address": "123 Business Street, City, Country"
		}
	}
}
  

const FlyerGenerator = () => {

    const [showFlyer, setShowFlyer] = useState("false")
	const [status, setStatus] = useState("DEFAULT")
	const [campaignDetails, setCampaignDetails] = useState(null)
    const switchToVertical = useMediaQuery("(max-width: 1100px)") 
	const isMobile = useMediaQuery("(max-width: 600px)")
    
    return (
        <div className="h-dvh">
            <Navbar />

			<div
				className={`flex ${switchToVertical === true ? "flex-col gap-10" : "flex-row gap-5"} h-[calc(100vh-70px)] p-[14px]`}
			>
				<FlyerEditor status={status} campaignDetails={campaignDetails} switchToVertical={switchToVertical} isMobile={isMobile} />

				<AIAssistant setStatus={setStatus} setCampaignDetails={setCampaignDetails} switchToVertical={switchToVertical} />
			</div>
           
        </div>
    );
};

export default FlyerGenerator;