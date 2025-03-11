import React, { useState } from "react";
import {
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";
import { ChatSession } from "@google/generative-ai";
import { CampaignDetail } from "../gemini/GeminiFunctions";

/**
 * @typedef {Object} CreatorProps
 * @property {ChatSession | null} chatSession
 * @property {CampaignDetail | null} campaignDetails
 */

/** @param {CreatorProps} props */
const Creator = ({ campaignDetails, chatSession, uploadedImage, setUploadedImage }) => {
  /**
   * @typedef {Object} ChatLogItem
   * @property {string} sender
   * @property {string} text
   */

  /** @type {[[ChatLogItem], React.Dispatch<React.SetStateAction<[ChatLogItem]>>]} */
  const [chatLog, setChatLog] = useState([]); // chat log for AI Assistant component

  const [localCampaignDetails, setLocalCampaignDetails] =
    useState(campaignDetails);

  const [status, setStatus] = useState("DEFAULT"); // switch between "DEFAULT" and "LOADING"
  const switchToVertical = useMediaQuery("(max-width: 1100px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [mediaMode, setMediaMode] = useState("FLYER"); // switch between "FLYER" and "SOCIAL MEDIA"
  const mediaModes = ["FLYER", "FLYER2", "SOCIAL POSTS"];

  return (
    <div className="h-dvh">
      <Navbar />

      <div
        className={`flex ${
          switchToVertical === true ? "flex-col gap-10" : "flex-row gap-5"
        } flex-auto h-[calc(100vh-70px)] p-[14px]`}
      >
        <FlyerEditor
          setMediaMode={setMediaMode}
          mediaModes={mediaModes}
          mediaMode={mediaMode}
          status={status}
          campaignDetails={localCampaignDetails}
          switchToVertical={switchToVertical}
          isMobile={isMobile}
          uploadedImage={uploadedImage}
        />
        <AIAssistant
          chatLog={chatLog}
          setChatLog={setChatLog}
          mediaMode={mediaMode}
          setStatus={setStatus}
          setCampaignDetails={setLocalCampaignDetails}
          campaignDetails={localCampaignDetails}
          switchToVertical={switchToVertical}
          chatSession={chatSession}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
      </div>
    </div>
  );
};

export default Creator;
