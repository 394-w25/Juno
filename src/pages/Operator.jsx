import { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar";
import { createNewChat, sendChat, createDateBasedCampaignChat} from "../gemini/GeminiFunctions";
import Template1 from "../components/templates/Template1";
import backgroundImg from "../assets/template_bg_img.png";
import logoImg from "../assets/template_logo.png";
import productImg from "../assets/ProductImageTest.png";
import { useAuthContext } from "../components/AuthContext";
import { ChatSession } from "@google/generative-ai";

/**
 * @typedef {Object} OperatorProps
 * @property {ChatSession | null} chatSession
 * @property {React.Dispatch<React.SetStateAction<ChatSession | null>>} setChatSession
 * @property {React.Dispatch<React.SetStateAction<any>>} setCampaignDetails
 */

/** @param {OperatorProps} props */
const Operator = ({setCampaignDetails, chatSession, setChatSession}) => {

    const { businessConfig } = useAuthContext() // get business config from auth context

    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [showPrompt, setShowPrompt] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [firstMessageSent, setFirstMessageSent] = useState(false);
    const [campaignOptions, setCampaignOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false); //loading button

    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat]);

    const handleSend = async () => {
        if (!message.trim()) return;
    
        if (!firstMessageSent) {
            setFadeOut(true);
            setTimeout(() => {
                setShowPrompt(false);
                setFirstMessageSent(true);
            }, 500);
        }
    
        const userMessage = message;
        setMessage("");
    
        setChat(prevChat => [...prevChat, { sender: "User", text: userMessage }]);
    
        let session = chatSession || createNewChat(businessConfig);
        setChatSession(session);
        setIsLoading(true);
    
        try {
            const response = await sendChat(session, userMessage);
            console.log("AI Response:", response);
    
            if (typeof response === "string") {
                // If the response is a string (normal chat) we only display this
                setChat(prevChat => [
                    ...prevChat,
                    { sender: "AI", text: response }
                ]);
            } else if (response && response.your_conversation_response) {
                // If it's JSON, then behave normally 
                setChat(prevChat => [
                    ...prevChat,
                    { sender: "AI", text: response.your_conversation_response }
                ]);
            } else {
                // Otherwise say this
                setChat(prevChat => [
                    ...prevChat,
                    { sender: "AI", text: "I'm not sure how to respond." }
                ]);
            }
    
            if (response.campaign_options && response.campaign_options.length > 0) {
                setCampaignOptions(response.campaign_options);
            }
        } catch (error) {
            console.error("Error handling AI response:", error);
            setChat(prevChat => [
                ...prevChat,
                { sender: "AI", text: "Oops! Something went wrong." }
            ]);
        } finally {
            setIsLoading(false); // stop
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await handleSend();
        }
    };

    const handleGetDateBasedCampaign = async () => {
        if (!firstMessageSent) {
            setFadeOut(true);
            setTimeout(() => {
                setShowPrompt(false);
                setFirstMessageSent(true);
            }, 500);
        }
        
        setChat(prevChat => [...prevChat, { sender: "User", text: "Generate marketing campaigns for next month." }]);
    
        let session = chatSession || createDateBasedCampaignChat(businessConfig);
        setChatSession(session);
        setIsLoading(true);
        try {
            const response = await sendChat(session, "Generate five marketing campaign options for an event in the next month.");
    
            if (response && response.campaign_options) {
                setCampaignOptions(response.campaign_options);
                setChat(prevChat => [
                    ...prevChat,
                    { sender: "AI", text: "Here are five campaign options for you to choose from." }
                ]);
            } else {
                setChat(prevChat => [
                    ...prevChat,
                    { sender: "AI", text: "Sorry, I couldn't generate campaign options at this time." }
                ]);
            }
        } catch (error) {
            console.error("Error fetching campaign options:", error);
            setChat(prevChat => [
                ...prevChat,
                { sender: "AI", text: "Oops! Something went wrong while generating campaigns." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectCampaign = (selectedCampaign) => {
        setChat(prevChat => [
            ...prevChat,
            { sender: "User", text: `I choose: ${selectedCampaign.campaign_title}` },
            { sender: "AI", text: `Great choice! You can now go to the Creator page to make changes to your selected campaign recommendation` }
        ]);

        setCampaignDetails(selectedCampaign);
    
        setTimeout(() => setCampaignOptions([]), 500);
    };


    return (
        <div className="h-screen bg-gradient-to-b from-blue-500/10 to-blue-500/30 rounded-[20px] backdrop-blur-md flex flex-col overflow-hidden relative">
            <div className="flex-none">
                <Navbar />
            </div>

            <div ref={chatContainerRef} className="flex-grow overflow-y-auto px-4 pb-4 flex flex-col-reverse items-center w-full">
                {chat.slice().reverse().map((msg, index) => (
                    <div
                        key={index}
                        className={`flex w-[837px] ${msg.sender === "User" ? "justify-end" : "justify-start"} mb-2`}
                    >
                        <div
                            className={`max-w-[75%] p-3 rounded-lg shadow-md border border-gray-300 
                            ${msg.sender === "User" ? "bg-blue-500 text-white" : "bg-white text-black"} break-words whitespace-pre-wrap`}
                        >
                            <p className="text-lg font-medium">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {campaignOptions.length > 0 && (
                <div className="flex space-x-6 justify-center mb-54">
                    {campaignOptions.map((option, index) => (
                        <button
                            key={index}
                            className="flex-shrink-0 border border-gray-300 shadow-md rounded-lg transition hover:scale-[1.05] hover:shadow-lg focus:outline-none"
                            onClick={() => handleSelectCampaign(option)}
                        >
                            <div className="w-[150px] scale-[0.2] origin-top-left transform ">
                                <Template1
                                    callToAction={option.call_to_action}
                                    campaignTitle={option.campaign_title}
                                    background={backgroundImg}
                                    logo={logoImg}
                                    discount={option.discount}
                                    campaignDetail={option.campaign_detail}
                                    campaignPeriod={option.campaign_period}
                                    productImage={productImg}
                                    website={businessConfig?.web_url}
                                    phoneNumber={businessConfig?.phone}
                                    address={businessConfig?.address}
                                />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            <div className="flex justify-center items-center w-full mt-4 mb-4">
                <button
                    className="w-[311px] h-[27px] border border-[#3F8CFF] rounded-full text-[#3F8CFF] font-medium text-sm flex justify-center items-center hover:bg-[#3F8CFF] hover:text-white transition"
                    onClick={handleGetDateBasedCampaign}
                    disabled={isLoading} 
                >
                    {isLoading ? <CircularProgress size={20} thickness={5} color="inherit" /> : "Get Business Campaign Recommendations"}
                </button>
            </div>

            {/* Message Box */}
            <div className="relative flex flex-col items-center mb-4">
                <textarea
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-[837px] h-[100px] p-3 border border-gray-300 rounded-md shadow-md resize-none bg-white text-black"
                />
            </div>

        </div>
    );
};

export default Operator;