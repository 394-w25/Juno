import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const Map = () => {
  return (
    <Card sx={{ mb: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">Map</Typography>
        <Box sx={{ height: 300, bgcolor: "#dbeafe", borderRadius: 2 }} />
      </CardContent>
    </Card>
  );
};

export default Map;