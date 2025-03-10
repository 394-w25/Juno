import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import {

  createDateBasedCampaignChat,
  sendChatOptions,
  CampaignDetail,
} from "../gemini/GeminiFunctions";
import Template1 from "../components/templates/Template1";
import Template3 from "../components/templates/Template3";
import backgroundImg from "../assets/template_bg_img.png";
import logoImg from "../assets/template_logo.png";
import productImg from "../assets/ProductImageTest.png";
import { useAuthContext } from "../components/AuthContext";
import { ChatSession } from "@google/generative-ai";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "../components/Loading";

/**
 * @typedef {Object} OperatorProps
 * @property {ChatSession | null} chatSession
 * @property {React.Dispatch<React.SetStateAction<ChatSession | null>>} setChatSession
 * @property {React.Dispatch<React.SetStateAction<any>>} setCampaignDetails
 */

/** @param {OperatorProps} props */
const Operator = ({ setCampaignDetails, chatSession, setChatSession }) => {

  const queryParams = new URLSearchParams(useLocation().search)
  const fromOnboarding = queryParams.get("onboarding") === "true"

  const { businessConfig } = useAuthContext(); // get business config from auth context
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPrompt, setShowPrompt] = useState(true);
  const [isLoading, setIsLoading] = useState(false); //loading button
  const autoFetchRecs = useRef(false);

  /** @type {[[CampaignDetail], React.Dispatch<React.SetStateAction<[CampaignDetail]>>]} */
  const [campaignOptions, setCampaignOptions] = useState([]);

  /**
   * @typedef {Object} ChatLogItem
   * @property {string} sender
   * @property {string} text
   */

  /** @type {[[ChatLogItem], React.Dispatch<React.SetStateAction<[ChatLogItem]>>]} */
  const [chatLog, setChatLog] = useState([]);

  const chatContainerRef = useRef(null);

  //auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  //auto-fetch recs
  useEffect(() => {
    if (fromOnboarding && !autoFetchRecs.current) {
      autoFetchRecs.current = true;
      handleGetDateBasedCampaign();
    }
  }, [fromOnboarding, chatSession]);

  const handleSend = async (prompt, isOptions = false) => {
    let trimmedMsg = "";

    if (prompt === undefined) {
      trimmedMsg = message.trim();
    } else {
      trimmedMsg = prompt;
    } 

    if (trimmedMsg.length < 1) return;

    setShowPrompt(false);

    const userMessage = message;
    setMessage("");

    setChatLog((prevChat) => [
      ...prevChat,
      { sender: "User", text: trimmedMsg },
    ]);
    
    let session =
      chatSession === null
        ? isOptions
          ? createDateBasedCampaignChat(businessConfig)
          : createNewChat(businessConfig)
        : chatSession;

    setChatSession(session);
    setIsLoading(true);

    try {
      const response = await sendChatOptions(session, userMessage);

      console.log("AI Response:", response);

      setChatLog((prevChat) => [
        ...prevChat,
        { sender: "AI", text: response.conversation_response },
      ]);

      if (response.campaign_options && response.campaign_options.length > 0) {
        setCampaignOptions(response.campaign_options);
      }
    } catch (error) {
      console.error("Error handling AI response:", error);
      setChatLog((prevChat) => [
        ...prevChat,
        { sender: "AI", text: "Oops! Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSend();
    }
  };

  const handleGetDateBasedCampaign = async () => {
    await handleSend(
      "Generate six marketing campaign options for an event in the next month.",
      true
    );
  };

  const handleSelectCampaign = (selectedCampaign) => {
    setChatLog((prevChat) => [
      ...prevChat,
      { sender: "User", text: `I choose: ${selectedCampaign.campaign_title}` },
      {
        sender: "AI",
        text: `Great choice! You can now go to the Creator page to make changes to your selected campaign recommendation`,
      },
    ]);

    setCampaignDetails(selectedCampaign);

    setTimeout(() => setCampaignOptions([]), 500);
    navigate("/creator");
  };

  if (fromOnboarding && isLoading) {
    return (
      <LoadingScreen text={"Generating some recs for you..."} />
    )
  }
  
  return (
    <div>
      <Navbar />

      <div className="h-[calc(100vh-70px)] bg-gradient-to-b from-blue-500/10 to-blue-500/30 rounded-[20px] backdrop-blur-md justify-center flex flex-col overflow-hidden relative py-10">
        {showPrompt && (
          <div
            className={`absolute top-2/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4 transition-opacity duration-500`}
          >
            <div data-svg-wrapper className="flex items-center justify-center">
              <svg
                width="64"
                height="78"
                viewBox="0 0 46 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask id="path-1-inside-1_244_119" fill="white">
                  <path d="M45.9537 19.8687C45.9537 25.3065 45.8008 30.7509 45.9871 36.1822C46.3506 46.7803 38.3746 54.0846 30.2007 55.5353C19.5193 57.4305 11.0371 53.4629 4.81585 44.7587C-2.65534 34.3027 -1.24614 19.634 7.74215 9.9679C13.1105 4.19637 19.7518 1.15029 27.4452 0.340863C33.2285 -0.267832 39.0361 0.145351 44.8322 0.0449878C45.9138 0.0267399 45.946 0.0866971 45.9485 1.36796C45.9601 7.53442 45.9537 13.7022 45.9549 19.8687H45.9537Z" />
                </mask>
                <path
                  d="M45.9537 19.8687C45.9537 25.3065 45.8008 30.7509 45.9871 36.1822C46.3506 46.7803 38.3746 54.0846 30.2007 55.5353C19.5193 57.4305 11.0371 53.4629 4.81585 44.7587C-2.65534 34.3027 -1.24614 19.634 7.74215 9.9679C13.1105 4.19637 19.7518 1.15029 27.4452 0.340863C33.2285 -0.267832 39.0361 0.145351 44.8322 0.0449878C45.9138 0.0267399 45.946 0.0866971 45.9485 1.36796C45.9601 7.53442 45.9537 13.7022 45.9549 19.8687H45.9537Z"
                  stroke="black"
                  strokeWidth="2"
                  mask="url(#path-1-inside-1_244_119)"
                />
                <mask id="path-2-inside-2_244_119" fill="white">
                  <path d="M40.9655 21.6361C40.9655 25.892 40.8458 30.153 40.9916 34.4038C41.2761 42.6984 35.0337 48.4151 28.6365 49.5505C20.2767 51.0337 13.6382 47.9285 8.76911 41.1162C2.92181 32.9328 4.02471 21.4524 11.0594 13.8873C15.2609 9.37021 20.4587 6.9862 26.4799 6.35271C31.0061 5.87632 35.5515 6.1997 40.0878 6.12115C40.9343 6.10687 40.9594 6.15379 40.9614 7.15656C40.9705 11.9827 40.9655 16.8099 40.9665 21.6361H40.9655Z" />
                </mask>
                <path
                  d="M40.9655 21.6361C40.9655 25.892 40.8458 30.153 40.9916 34.4038C41.2761 42.6984 35.0337 48.4151 28.6365 49.5505C20.2767 51.0337 13.6382 47.9285 8.76911 41.1162C2.92181 32.9328 4.02471 21.4524 11.0594 13.8873C15.2609 9.37021 20.4587 6.9862 26.4799 6.35271C31.0061 5.87632 35.5515 6.1997 40.0878 6.12115C40.9343 6.10687 40.9594 6.15379 40.9614 7.15656C40.9705 11.9827 40.9655 16.8099 40.9665 21.6361H40.9655Z"
                  stroke="black"
                  strokeWidth="2"
                  mask="url(#path-2-inside-2_244_119)"
                />
                <mask id="path-3-inside-3_244_119" fill="white">
                  <path d="M34.4768 23.9343C34.4768 26.6532 34.4004 29.3754 34.4935 32.0911C34.6753 37.3901 30.6873 41.0423 26.6003 41.7676C21.2596 42.7152 17.0186 40.7314 13.9079 36.3793C10.1723 31.1513 10.8769 23.817 15.3711 18.9839C18.0552 16.0982 21.3759 14.5751 25.2226 14.1704C28.1142 13.8661 31.018 14.0727 33.9161 14.0225C34.4569 14.0134 34.4729 14.0433 34.4742 14.684C34.48 17.7672 34.4768 20.8511 34.4774 23.9343H34.4768Z" />
                </mask>
                <path
                  d="M34.4768 23.9343C34.4768 26.6532 34.4004 29.3754 34.4935 32.0911C34.6753 37.3901 30.6873 41.0423 26.6003 41.7676C21.2596 42.7152 17.0186 40.7314 13.9079 36.3793C10.1723 31.1513 10.8769 23.817 15.3711 18.9839C18.0552 16.0982 21.3759 14.5751 25.2226 14.1704C28.1142 13.8661 31.018 14.0727 33.9161 14.0225C34.4569 14.0134 34.4729 14.0433 34.4742 14.684C34.48 17.7672 34.4768 20.8511 34.4774 23.9343H34.4768Z"
                  stroke="black"
                  strokeWidth="2"
                  mask="url(#path-3-inside-3_244_119)"
                />
                <mask id="path-4-inside-4_244_119" fill="white">
                  <path d="M30.3782 25.3863C30.3782 27.1342 30.329 28.8842 30.3889 30.6299C30.5058 34.0365 27.942 36.3843 25.3147 36.8506C21.8815 37.4597 19.1551 36.1844 17.1554 33.3867C14.7539 30.0258 15.2069 25.3109 18.096 22.204C19.8215 20.3488 21.9562 19.3697 24.4291 19.1096C26.288 18.9139 28.1547 19.0467 30.0177 19.0145C30.3654 19.0086 30.3757 19.0279 30.3765 19.4397C30.3802 21.4218 30.3782 23.4043 30.3786 25.3863H30.3782Z" />
                </mask>
                <path
                  d="M30.3782 25.3863C30.3782 27.1342 30.329 28.8842 30.3889 30.6299C30.5058 34.0365 27.942 36.3843 25.3147 36.8506C21.8815 37.4597 19.1551 36.1844 17.1554 33.3867C14.7539 30.0258 15.2069 25.3109 18.096 22.204C19.8215 20.3488 21.9562 19.3697 24.4291 19.1096C26.288 18.9139 28.1547 19.0467 30.0177 19.0145C30.3654 19.0086 30.3757 19.0279 30.3765 19.4397C30.3802 21.4218 30.3782 23.4043 30.3786 25.3863H30.3782Z"
                  fill="#3F8CFF"
                  stroke="black"
                  strokeWidth="2"
                  mask="url(#path-4-inside-4_244_119)"
                />
              </svg>
            </div>
            <div className="text-center text-black text-3xl font-bold font-[\'Plus Jakarta Sans\']">
              How can I help you today?
            </div>
          </div>
        )}

        <div
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto px-4 pb-4 flex flex-col-reverse items-center w-full"
        >
          {campaignOptions.length > 0 && (
            <>
              <div className="flex flex-wrap justify-center items-center space-x-6 mx-auto">
                {campaignOptions.map((option, index) => (
                  <button
                    key={index}
                    className=" rounded-[20px] transition hover:scale-[1.05] hover:shadow-lg focus:outline-none mx-[30px] my-[25px] flex-wrap items-center justify-content"
                    onClick={() => handleSelectCampaign(option)}
                  >
                    <div className="w-[470px] flex h-[282px] relative bg-gradient-to-b from-blue-600/75 to-blue-500/75 rounded-[20px] shadow-[0px_4px_22px_0px_rgba(0,0,0,0.15)] backdrop-blur-[30px] ">
                      <div className="w-1/2 h-full relative transform">
                        <Template1
                          callToAction={option.call_to_action}
                          campaignTitle={option.campaign_title}
                          background={backgroundImg}
                          logo={logoImg}
                          discount={option.discount}
                          campaignDetail={option.campaign_detail}
                          campaignPeriod={{
                            start_date: option.start_date,
                            end_date: option.end_date,
                          }}
                          productImage={productImg}
                          website={businessConfig.web_url}
                          phoneNumber={businessConfig.phone}
                          address={businessConfig.address}
                          inOperator={true}
                        />
                      </div>
                      <div className="w-1/2 h-full flex flex-col gap-2 py-5 pr-5">
                        <p className="text-[22px] text-left font-bold font-[\'Plus Jakarta Sans\'] text-white">
                          {option.campaign_title}
                        </p>
                        <p className="text-[16px] text-left text-white overflow-auto break-words">
                          {option.insights}
                        </p>
                    </div>
                  </div>
                </button>
                ))}
              </div>
            </>
          )}
          {chatLog
            .slice()
            .reverse()
            .map((msg, index) => (
              <div
                key={index}
                className={`flex w-[837px] ${
                  msg.sender === "User" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-md border border-gray-300 
                            ${
                              msg.sender === "User"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                            } break-words whitespace-pre-wrap`}
                >
                  <p className="text-lg font-medium">{msg.text}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="flex justify-center items-center w-full mt-4 mb-4">
          <button
            className="w-[311px] h-[27px] border border-[#3F8CFF] rounded-full text-[#3F8CFF] font-medium text-sm flex justify-center items-center hover:bg-[#3F8CFF] hover:text-white transition"
            onClick={handleGetDateBasedCampaign}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={20} thickness={5} color="inherit" />
            ) : (
              "Get Business Campaign Recommendations"
            )}
          </button>
        </div>

        <div className="relative flex flex-col items-center z-10">
          <div className="w-[837px] h-[155px] bg-white shadow-lg border border-gray-300 rounded-xl p-4 overflow-y-auto">
            <textarea
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-full text-lg bg-transparent outline-none resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operator;
