import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AIAssistant = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState(["Sure, here are your changes. Let me know if I can edit anything else."]);

    const handleSend = () => {
        if (message.trim()) {
        setChat([...chat, message]);
        setMessage("");
        }
    };

    return (
        <Box sx={{ p: 3, bgcolor: "#e3f2fd", height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight="bold">AI Assistant</Typography>
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
                {chat.map((msg, index) => (
                <Typography key={index} sx={{ my: 1, p: 1, bgcolor: "#fff", borderRadius: 1 }}>
                    {msg}
                </Typography>
                ))}
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ bgcolor: "#fff", borderRadius: 1 }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSend} sx={{ mt: 1 }}>
                Send
            </Button>
        </Box>
    );
};

export default AIAssistant;