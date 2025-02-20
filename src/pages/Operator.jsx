import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";

const Operator = () => {
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
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl backdrop-blur-lg">
            <div className="flex-none">
                <Navbar />
            </div>
            
            {/* Chat Container with Messages Stacking from Bottom */}
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

            {/* Input Box (Moved Significantly Higher) */}
            <div className="relative flex flex-col items-center mb-36 z-10">
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
    );
};

export default Operator;