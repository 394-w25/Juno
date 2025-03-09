import React from "react";
import { Grid, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import Map from "../components/Map";
import Recommendations from "../components/Recommendations";
import TopInsights from "../components/TopInsights";
import AIAssistant from "../components/AIAssistant";

const Insights = () => {
  return (
    <div>
      <Navbar />
      <Grid container spacing={2} sx={{ height: "90vh", p: 2 }}>
        {/* Left Section */}
        <Grid item xs={9} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Map />
          <TopInsights />
        </Grid>

        {/* Right Section (AI Assistant Full Height) */}
        <Grid item xs={3} sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box sx={{ flex: 1 }}>
            <AIAssistant />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Insights;