import React, { useState, useEffect, useRef } from "react";
import { ArrowUpward } from "@mui/icons-material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createNewChat, sendChat } from "../gemini/GeminiFunctions";
import { businessConfig } from "../pages/Creator";
import ReactMarkdown from "react-markdown";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AIAssistant = ({
  mediaMode,
  setStatus,
  setCampaignDetails,
  campaignDetails,
  switchToVertical,
  chatSession,
}) => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]); // chat log
  const [chat, setChat] = useState(null); // ongoing chat with Gemini
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const storage = getStorage();

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = async () => {
    const trimmedMsg = message.trim();
    if (trimmedMsg) {
      setMessage("");
      setChatLog([...chatLog, { sender: "User", text: trimmedMsg }]);
      setStatus("LOADING");

      let tmpChat = chatSession || chat;
      if (tmpChat === null) {
        tmpChat = createNewChat(businessConfig);
      }

      const response = await sendChat(
        tmpChat,
        trimmedMsg,
        mediaMode,
        campaignDetails,
        uploadedImageURL // include uploaded image URL in the prompt
      );

      setChatLog([
        ...chatLog,
        { sender: "User", text: trimmedMsg },
        { sender: "AI", text: response.your_conversation_response },
      ]);
      setStatus("DEFAULT");

      if (response.campaign_details) {
        setCampaignDetails(response.campaign_details);
      }
      setChat(tmpChat);
    }
  };

  const handleMakeMeAMarketingCampaign = async () => {
    setChatLog([
      ...chatLog,
      { sender: "User", text: "Make me a marketing campaign." },
    ]);
    setStatus("LOADING");

    let tmpChat = chat;
    if (tmpChat === null) {
      tmpChat = createNewChat(businessConfig);
    }

    const response = await sendChat(
      tmpChat,
      "Make me a marketing campaign. (Keep date in mind but do not mention I said that).",
      mediaMode,
      campaignDetails,
      uploadedImageURL
    );

    setChatLog([
      ...chatLog,
      { sender: "User", text: "Make me a marketing campaign." },
      { sender: "AI", text: response.your_conversation_response },
    ]);
    setStatus("DEFAULT");

    if (response.campaign_details) {
      setCampaignDetails(response.campaign_details);
    }
    setChat(tmpChat);
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
        switchToVertical === false ? "h-full w-1/3" : "h-1/4"
      }`}
      style={{ boxShadow: "0 0px 5px rgba(0, 0, 0, 0.5)" }}
    >
      {/* Chat Container */}
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
                className={`max-w-[75%] p-3 rounded-xl shadow-md border border-gray-300 ${
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

      <div className="flex justify-center items-center w-full mt-4">
        <button
          className="px-4 py-0.5 border border-[#3F8CFF] rounded-full text-[#3F8CFF] font-medium text-sm flex justify-center items-center hover:bg-[#3F8CFF] hover:text-white transition"
          onClick={handleMakeMeAMarketingCampaign}
        >
          Make Marketing Campaign
        </button>
      </div>

      <div
        className="p-3 bg-white rounded-lg flex items-center gap-3"
        style={{ boxShadow: "0 0 4px rgba(0, 0, 0, 0.5)" }}
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
          onClick={() =>
            fileInputRef.current && fileInputRef.current.click()
          }
        >
          <PhotoCamera fontSize="small" />
        </button>
        {/* Send Message Button */}
        <button
          className="p-1 bg-blue-500 text-white rounded-full cursor-pointer flex justify-center items-center hover:opacity-75"
          onClick={handleSend}
        >
          <ArrowUpward fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;

