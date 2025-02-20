import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";

const FlyerGenerator = () => {

    const [showFlyer, setShowFlyer] = useState("false")
    const isMobile = useMediaQuery("(max-width: 1300px)")
    
    return (
        <div className="h-dvh">
            <Navbar />

			{isMobile ? 
				<></>
			:
			<Grid spacing={2} container sx={{ height: "calc(100% - 70px)", p: 2 }}>
				<Grid size={8}>
					<FlyerEditor showFlyer={showFlyer} />
				</Grid>

				<Grid size={4}>
				<AIAssistant setShowFlyer={setShowFlyer} />
				</Grid>
			</Grid>
			}
            
        </div>
    );
};

export default FlyerGenerator;