import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./components/Navbar";
import FlyerEditor from "./components/FlyerEditor";
import AIAssistant from "./components/AIAssistant";

const App = () => {
    return (
        <div>
            <Navbar />
            <Grid container spacing={2} sx={{ height: "90vh", p: 2 }}>
                <Grid item xs={8}>
                  <FlyerEditor />
                </Grid>

                <Grid item xs={4}>
                  <AIAssistant />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;