import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ArrowUpward, PhotoCamera } from "@mui/icons-material";
import {
  CampaignDetail,
  createNewChat,
  sendChat,
} from "../gemini/GeminiFunctions";
import ReactMarkdown from "react-markdown";
import { useAuthContext } from "./AuthContext";
import { ChatSession } from "@google/generative-ai";

/**
 * @typedef {Object} AIAssistantProps
 * @property {string} mediaMode
 * @property {React.Dispatch<React.SetStateAction<string>>} setStatus
 * @property {React.Dispatch<React.SetStateAction<CampaignDetail | null>>} setCampaignDetails
 * @property {CampaignDetail | null} campaignDetails
 * @property {boolean} switchToVertical
 * @property {ChatSession | null} chatSession
 * @property {[ChatLogItem]} chatLog
 * @property {React.Dispatch<React.SetStateAction<[ChatLogItem]>>} setChatLog
 */

/** @param {AIAssistantProps} props */
const AIAssistant = ({
  mediaMode,
  setStatus,
  setCampaignDetails,
  campaignDetails,
  switchToVertical,
  chatSession,
  chatLog,
  setChatLog,
}) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null); // ongoing chat with gemini

  const { businessConfig } = useAuthContext();

  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    console.log("log", chatLog);
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = async (prompt) => {
    let trimmedMsg = "";

    if (prompt === undefined) {
      trimmedMsg = message.trim();
    } else {
      trimmedMsg = prompt;
    }

    if (trimmedMsg.length > 0) {
      let tmpChatLog = chatLog;
      setMessage("");
      tmpChatLog.push({ sender: "User", text: trimmedMsg });
      setStatus("LOADING");

      let tmpChat = chatSession || chat;

      if (tmpChat === null) {
        tmpChat = createNewChat(businessConfig);
      }

      const response = await sendChat(
        tmpChat,
        trimmedMsg,
        mediaMode,
        campaignDetails
      ); // sends prompt to Gemini

      console.log("response", response);
      // updates chat log with Gemini's response
      tmpChatLog.push({ sender: "AI", text: response.conversation_response });

      setStatus("DEFAULT");

      if (response.campaign_details) {
        // Gemini gave us details for the flyer
        setCampaignDetails(response.campaign_details);
      }

      console.log("tmpLog", tmpChatLog);
      setChatLog(tmpChatLog);
      setChat(tmpChat); // update the actual chat with tmpChat
    }
  };

  const handleMakeMeAMarketingCampaign = async () => {
    await handleSend("Make me a marketing campaign");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSend();
    }
  };

  // Local image upload handler using Firebase Storage
  const localHandleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}_${Date.now()}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setUploadedImageURL(downloadURL);
      // Add an image message to the chat log:
      setChatLog((prev) => [
        ...prev,
        { sender: "User", image: downloadURL, text: "Uploaded an image:" },
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div
      className={`p-4 bg-white overflow-hidden flex flex-col gap-4 relative rounded-lg ${
        switchToVertical === false ? "h-full w-1/3" : "h-2/5"
      }`}
      style={{
        boxShadow: `0 0px 5px rgba(0, 0, 0, 0.5)`, // shadows aren't working in tailwind for some reason
      }}
    >
      {/* Chat Container with Messages Stacking from Bottom */}
      <div
        ref={chatContainerRef}
        className="gap-2 flex-grow overflow-y-auto flex flex-col-reverse"
      >
        {chatLog
          .slice()
          .reverse()
          .map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "User" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-xl shadow-md border border-gray-300 
                                ${
                                  msg.sender === "User"
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-black"
                                }`}
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center w-full">
        <button
          className="px-4 py-0.5 border border-[#3F8CFF] rounded-full text-[#3F8CFF] font-medium text-sm flex justify-center items-center hover:bg-[#3F8CFF] hover:text-white transition"
          onClick={handleMakeMeAMarketingCampaign}
        >
          Make Marketing Campaign
        </button>
      </div>
      <div
        className="p-3 bg-white rounded-lg flex items-center gap-3"
        style={{
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)", // shadows aren't working in tailwind for some reason
        }}
      >
        <input
          type="text"
          placeholder="What can Juno do for you?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-base outline-none bg-transparent"
        />
        {/* Hidden file input for image upload */}
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={localHandleImageUpload}
        />
        {/* Camera Button */}
        <button
          className="p-1 bg-blue-500 text-white rounded-full cursor-pointer flex justify-center items-center hover:opacity-75"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <PhotoCamera fontSize="small" />
        </button>
        <button
          className="p-1 bg-blue-500 text-white rounded-full cursor-pointer flex justify-center hover:opacity-65"
          onClick={handleSend}
        >
          <ArrowUpward fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
