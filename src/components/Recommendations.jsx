import React, { useState } from "react";
import { Box, Paper, Typography, Switch } from "@mui/material";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([
    { text: "Rainy weekend ahead? Promote weather-relevant products", enabled: true },
    { text: "Peak hour campaign - Run campaigns in your peak hours", enabled: false },
    { text: "Connect Yelp merchant account to improve visibility", enabled: true },
  ]);

  const toggleRecommendation = (index) => {
    setRecommendations((prev) =>
      prev.map((item, i) => (i === index ? { ...item, enabled: !item.enabled } : item))
    );
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 3, bgcolor: "#3b82f6", color: "#fff" }}>
      <Typography variant="h6" fontWeight="bold">Recommendations</Typography>
      {recommendations.map((item, index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2">{item.text}</Typography>
          <Switch
            checked={item.enabled}
            onChange={() => toggleRecommendation(index)}
            sx={{ color: "#fff" }}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default Recommendations;