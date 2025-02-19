import React, { useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";

const FlyerGenerator = () => {

    const [showFlyer, setShowFlyer] = useState("false")

    return (
        <div>
            <Navbar />
            <Grid container spacing={2} sx={{ height: "90vh", p: 2 }}>
                <Grid item xs={9}>
                  <FlyerEditor showFlyer={showFlyer} />
                </Grid>

                <Grid item xs={3}>
                  <AIAssistant setShowFlyer={setShowFlyer} />
                </Grid>
            </Grid>
        </div>
    );
};

export default FlyerGenerator;