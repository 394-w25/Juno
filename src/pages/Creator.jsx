import React, { useState } from "react";
import { Chip, ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";
import { ChatSession } from "@google/generative-ai";

export const businessConfig = {
	"business_details": {
		"name": "Liceria Florist",
		"address": "2145 Sheridan Rd, Evanston, IL 60208",
		"business_type": "retail",
		"phone":"+1 234 567 890",
		"industry": "florist",
		"web_url":"https://liceriaflorist.com"
	},

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

/**
 * @typedef {Object} CreatorProps
 * @property {ChatSession | null} chatSession
 * @property {Object | null} campaignDetails
 * @property {React.Dispatch<React.SetStateAction<any>>} setCampaignDetails
 */

/** @param {CreatorProps} props */
const Creator = ({campaignDetails, setCampaignDetails, chatSession}) => {

	const [status, setStatus] = useState("DEFAULT") // switch between "DEFAULT" and "LOADING"
    const switchToVertical = useMediaQuery("(max-width: 1100px)") 
	const isMobile = useMediaQuery("(max-width: 600px)")
	const [mediaMode, setMediaMode] = useState("FLYER") // switch between "FLYER" and "SOCIAL MEDIA"
	const mediaModes = ["FLYER", "SOCIAL POSTS"]

    return (
        <div className="h-dvh">
            <Navbar />

			<div
				className={`flex ${switchToVertical === true ? "flex-col gap-10" : "flex-row gap-5"} flex-auto h-[calc(100vh-70px)] p-[14px]`}
			>
				<FlyerEditor setMediaMode={setMediaMode} mediaModes={mediaModes} mediaMode={mediaMode} status={status} campaignDetails={campaignDetails} switchToVertical={switchToVertical} isMobile={isMobile}  />
				<AIAssistant mediaMode={mediaMode} setStatus={setStatus} setCampaignDetails={setCampaignDetails} campaignDetails={campaignDetails} switchToVertical={switchToVertical} chatSession={chatSession}/>
			</div>
        </div>
    );
};

export default Creator;