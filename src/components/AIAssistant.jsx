import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    "Sure, here are your changes. Let me know if I can edit anything else.",
  ]);
  const [imageUrl, setImageUrl] = useState(null);
  //   const [valentinesDayPosterPrompt, setValentinesDayPosterPrompt] =
  //     useState(false);

  //   const toggleVDayPromptDefault = () => {
  //     setValentinesDayPosterPrompt(!valentinesDayPosterPrompt);
  //   };

  const handleSend = () => {
    if (message.trim()) {
      setChat([...chat, message]);
      setMessage("");
    }
  };

  //   const posterPrompt =
  //     "Make me a poster for a Valentine's Day sale. Everything in my shop is 25% off. I sell flowers. My shop is on 1600 Pennsylvania Avenue, Evanston, IL. My store hours are from 7:00 AM - 9:00 PM. Make the poster have a blue background.";
  const AIBackgroundInfo =
    "You are a chatbot meant to make posters. Complete the following instructions:";
  const generateImage = async () => {
    try {
      console.log("Sending off user request to OpenAI");
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: message,
            n: 1,
            size: "512x512",
          }),
        }
      );
      console.log("");
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setImageUrl(data.data[0].url);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#e3f2fd",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        AI Assistant
      </Typography>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {chat.map((msg, index) => (
          <Typography
            key={index}
            sx={{ my: 1, p: 1, bgcolor: "#fff", borderRadius: 1 }}
          >
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSend}
        sx={{ mt: 1 }}
      >
        Send
      </Button>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={generateImage}
        sx={{ mt: 1 }}
      >
        Generate Image
      </Button>
      {/* <Button onClick={toggleVDayPromptDefault}>
        V Day {String(valentinesDayPosterPrompt)}
      </Button> */}
      {imageUrl && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <img
            src={imageUrl}
            alt="AI Generated"
            style={{ width: "100%", maxWidth: "512px", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AIAssistant;
