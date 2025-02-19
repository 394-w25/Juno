import React, { useState, useEffect, useRef } from "react";

const AIAssistant = ({ setShowFlyer }) => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([
        { sender: "AI", text: "How can I help you today?" }
    ]);

    const chatContainerRef = useRef(null);

    // Auto-scroll to bottom when chat updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chat]);

    const handleSend = () => {
        if (message.trim()) {
            setChat([...chat, { sender: "User", text: message }]);
            setMessage("");
            setShowFlyer("loading")
            setTimeout(() => {
                setShowFlyer("true")
            }, 2000)
        }
      
    //   console.log("");
    //   const data = await response.json();
    //   if (data.data && data.data.length > 0) {
    //     setImageUrl(data.data[0].url);
    //   }
  };


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
      
//       console.log("");
//       const data = await response.json();
//       if (data.data && data.data.length > 0) {
//         setImageUrl(data.data[0].url);
//       }
//     } catch (error) {
//       console.error("Error generating image:", error);
//     }
  };

    return (
        <div className="p-4 bg-blue-500/40 h-full flex flex-col relative">
            {/* Chat Container with Messages Stacking from Bottom */}
            <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-2 flex flex-col-reverse">
                {chat
                    .slice()
                    .reverse()
                    .map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"} mb-2`}
                        >
                            <div
                                className={`max-w-[75%] p-4 rounded-2xl shadow-md border border-gray-300 
                                ${msg.sender === "User" ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                                style={{ wordWrap: "break-word", whiteSpace: "pre-wrap", overflow: "hidden" }}
                            >
                                <p className="text-lg font-medium">{msg.text}</p>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Input Box (Moved Significantly Higher) */}
            <div className="relative flex flex-col items-center mb-36 z-10">
                <div className="w-[289px] h-[77px] bg-white rounded-xl shadow-[2px_2px_7px_0px_rgba(0,0,0,0.25)] border border-black/30 flex items-center px-4">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full text-lg outline-none bg-transparent"
                    />
                </div>
            </div>

            <div data-svg-wrapper className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-0">
                <svg width="64" height="78" viewBox="0 0 46 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_244_119" fill="white">
                        <path d="M45.9537 19.8687C45.9537 25.3065 45.8008 30.7509 45.9871 36.1822C46.3506 46.7803 38.3746 54.0846 30.2007 55.5353C19.5193 57.4305 11.0371 53.4629 4.81585 44.7587C-2.65534 34.3027 -1.24614 19.634 7.74215 9.9679C13.1105 4.19637 19.7518 1.15029 27.4452 0.340863C33.2285 -0.267832 39.0361 0.145351 44.8322 0.0449878C45.9138 0.0267399 45.946 0.0866971 45.9485 1.36796C45.9601 7.53442 45.9537 13.7022 45.9549 19.8687H45.9537Z"/>
                    </mask>
                        <path d="M45.9537 19.8687C45.9537 25.3065 45.8008 30.7509 45.9871 36.1822C46.3506 46.7803 38.3746 54.0846 30.2007 55.5353C19.5193 57.4305 11.0371 53.4629 4.81585 44.7587C-2.65534 34.3027 -1.24614 19.634 7.74215 9.9679C13.1105 4.19637 19.7518 1.15029 27.4452 0.340863C33.2285 -0.267832 39.0361 0.145351 44.8322 0.0449878C45.9138 0.0267399 45.946 0.0866971 45.9485 1.36796C45.9601 7.53442 45.9537 13.7022 45.9549 19.8687H45.9537Z" stroke="black" stroke-width="2" mask="url(#path-1-inside-1_244_119)"/>
                    <mask id="path-2-inside-2_244_119" fill="white">
                        <path d="M40.9655 21.6361C40.9655 25.892 40.8458 30.153 40.9916 34.4038C41.2761 42.6984 35.0337 48.4151 28.6365 49.5505C20.2767 51.0337 13.6382 47.9285 8.76911 41.1162C2.92181 32.9328 4.02471 21.4524 11.0594 13.8873C15.2609 9.37021 20.4587 6.9862 26.4799 6.35271C31.0061 5.87632 35.5515 6.1997 40.0878 6.12115C40.9343 6.10687 40.9594 6.15379 40.9614 7.15656C40.9705 11.9827 40.9655 16.8099 40.9665 21.6361H40.9655Z"/>
                    </mask>
                        <path d="M40.9655 21.6361C40.9655 25.892 40.8458 30.153 40.9916 34.4038C41.2761 42.6984 35.0337 48.4151 28.6365 49.5505C20.2767 51.0337 13.6382 47.9285 8.76911 41.1162C2.92181 32.9328 4.02471 21.4524 11.0594 13.8873C15.2609 9.37021 20.4587 6.9862 26.4799 6.35271C31.0061 5.87632 35.5515 6.1997 40.0878 6.12115C40.9343 6.10687 40.9594 6.15379 40.9614 7.15656C40.9705 11.9827 40.9655 16.8099 40.9665 21.6361H40.9655Z" stroke="black" stroke-width="2" mask="url(#path-2-inside-2_244_119)"/>
                    <mask id="path-3-inside-3_244_119" fill="white">
                        <path d="M34.4768 23.9343C34.4768 26.6532 34.4004 29.3754 34.4935 32.0911C34.6753 37.3901 30.6873 41.0423 26.6003 41.7676C21.2596 42.7152 17.0186 40.7314 13.9079 36.3793C10.1723 31.1513 10.8769 23.817 15.3711 18.9839C18.0552 16.0982 21.3759 14.5751 25.2226 14.1704C28.1142 13.8661 31.018 14.0727 33.9161 14.0225C34.4569 14.0134 34.4729 14.0433 34.4742 14.684C34.48 17.7672 34.4768 20.8511 34.4774 23.9343H34.4768Z"/>
                    </mask>
                        <path d="M34.4768 23.9343C34.4768 26.6532 34.4004 29.3754 34.4935 32.0911C34.6753 37.3901 30.6873 41.0423 26.6003 41.7676C21.2596 42.7152 17.0186 40.7314 13.9079 36.3793C10.1723 31.1513 10.8769 23.817 15.3711 18.9839C18.0552 16.0982 21.3759 14.5751 25.2226 14.1704C28.1142 13.8661 31.018 14.0727 33.9161 14.0225C34.4569 14.0134 34.4729 14.0433 34.4742 14.684C34.48 17.7672 34.4768 20.8511 34.4774 23.9343H34.4768Z" stroke="black" stroke-width="2" mask="url(#path-3-inside-3_244_119)"/>
                    <mask id="path-4-inside-4_244_119" fill="white">
                        <path d="M30.3782 25.3863C30.3782 27.1342 30.329 28.8842 30.3889 30.6299C30.5058 34.0365 27.942 36.3843 25.3147 36.8506C21.8815 37.4597 19.1551 36.1844 17.1554 33.3867C14.7539 30.0258 15.2069 25.3109 18.096 22.204C19.8215 20.3488 21.9562 19.3697 24.4291 19.1096C26.288 18.9139 28.1547 19.0467 30.0177 19.0145C30.3654 19.0086 30.3757 19.0279 30.3765 19.4397C30.3802 21.4218 30.3782 23.4043 30.3786 25.3863H30.3782Z"/>
                    </mask>
                        <path d="M30.3782 25.3863C30.3782 27.1342 30.329 28.8842 30.3889 30.6299C30.5058 34.0365 27.942 36.3843 25.3147 36.8506C21.8815 37.4597 19.1551 36.1844 17.1554 33.3867C14.7539 30.0258 15.2069 25.3109 18.096 22.204C19.8215 20.3488 21.9562 19.3697 24.4291 19.1096C26.288 18.9139 28.1547 19.0467 30.0177 19.0145C30.3654 19.0086 30.3757 19.0279 30.3765 19.4397C30.3802 21.4218 30.3782 23.4043 30.3786 25.3863H30.3782Z" fill="#3F8CFF" stroke="black" stroke-width="2" mask="url(#path-4-inside-4_244_119)"/>
                </svg>
            </div>
        </div>
    );

};

export default AIAssistant;
