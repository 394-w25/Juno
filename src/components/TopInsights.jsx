import React from "react";
import { Paper, Typography } from "@mui/material";

const TopInsights = () => {
  return (
    <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
      <Typography variant="h6" fontWeight="bold">Top Insights</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Engagement Up by <strong>25%</strong> – boost in campaign engagement this week!
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Top Location:</strong> Evanston Downtown
      </Typography>
    </Paper>
  );
};

export default TopInsights;