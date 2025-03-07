import React, { useState } from "react";
import { Chip, ToggleButton, ToggleButtonGroup, useMediaQuery } from "@mui/material";
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";
import { ChatSession } from "@google/generative-ai";

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