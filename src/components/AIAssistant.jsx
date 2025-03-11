import React, { useState, useEffect, useRef } from "react";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ArrowUpward } from "@mui/icons-material";
import { CampaignDetail, createNewChat, sendChat } from "../gemini/GeminiFunctions";
import ReactMarkdown from "react-markdown";
import { useAuthContext } from "./AuthContext";
import { ChatSession } from "@google/generative-ai";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

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
  uploadedImage,
  setUploadedImage
}) => {
  
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(null); // ongoing chat with gemini
  const [stagedImage, setStagedImage] = useState(null);

  const { businessConfig } = useAuthContext()

  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    console.log("log", chatLog)
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = async (prompt) => {
    let trimmedMsg = ""

    if (prompt === undefined) {
      trimmedMsg = message.trim();
    }
    else {
      trimmedMsg = prompt
    }

    if (trimmedMsg.length > 0) {
      let tmpChatLog = chatLog
      setMessage("");
      tmpChatLog.push({ sender: "User", text: trimmedMsg })
      setStatus("LOADING");

      let tmpChat = chatSession || chat;

      if (tmpChat === null) {
        tmpChat = createNewChat(businessConfig);
      }

      const response = await sendChat(tmpChat, trimmedMsg, mediaMode, campaignDetails); // sends prompt to Gemini

      console.log("response", response)
      // updates chat log with Gemini's response
      if (response){
        tmpChatLog.push({ sender: "AI", text: response.conversation_response })

        setStatus("DEFAULT");

        if (response.campaign_details) {
          // Gemini gave us details for the flyer
          setCampaignDetails(response.campaign_details);
        }

        setChatLog(tmpChatLog)
        setChat(tmpChat); // update the actual chat with tmpChat
      }
    }
    else{
      setCampaignDetails("Oops! Something went wrong. Please try again.");
      setChatLog(tmpChatLog);
      setChat(tmpChat);
    }
  };

  const handleMakeMeAMarketingCampaign = async () => {
    await handleSend("Make me a new marketing campaign")
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSend();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setStagedImage(imageUrl);
    } else {
      alert("Please upload a valid image file.");
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
      <div className="relative flex flex-col items-center z-10">
        <div className="relative w-full h-30 bg-white shadow-lg border border-gray-300 rounded-xl p-4 overflow-y-auto">
          <input
            type="text"
            placeholder="What can Juno do for you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-base outline-none bg-transparent pr-12"
          />
          <div className="absolute right-4 top-4">
            <button
              className="p-1 bg-blue-500 text-white rounded-full cursor-pointer flex justify-center hover:opacity-75"
              onClick={handleSend}
            >
              <ArrowUpward fontSize="small" />
            </button>
          </div>
          <div className="absolute bottom-1 left-1 cursor-pointer">
            <IconButton
              color="primary"
              component="label"
              size="medium"
            >
              <AddPhotoAlternateIcon />
              <input type="file" accept="image/*" hidden onChange={handleImageChange}/>
            </IconButton>
            {stagedImage && (
              <div className="absolute bottom-1 left-10 w-14 h-14 border border-gray-300 rounded-md">
                <img
                  src={stagedImage}
                  alt="Uploaded Preview"
                  className="w-full h-full object-cover"
                />
                <button
                    onClick={() => setStagedImage(null)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs rounded-full hover:bg-red-600"
                  >
                    ✖
                </button>
              </div>
            )}
          </div>
          </div>  
      </div>
    </div>
  );
};

export default AIAssistant;
