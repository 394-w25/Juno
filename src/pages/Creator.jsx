import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Navbar from "../components/Navbar";
import FlyerEditor from "../components/FlyerEditor";
import AIAssistant from "../components/AIAssistant";

const FlyerGenerator = () => {

    const [showFlyer, setShowFlyer] = useState("false")
    const switchToVertical = useMediaQuery("(max-width: 1100px)") 
	const isMobile = useMediaQuery("(max-width: 600px)")
    
    return (
        <div className="h-dvh">
            <Navbar />

			{switchToVertical ? 
				<div
					className="flex flex-col h-[calc(100vh-70px)] gap-10"	
				>
					<FlyerEditor showFlyer={showFlyer} switchToVertical={switchToVertical} isMobile={isMobile} />

					<AIAssistant setShowFlyer={setShowFlyer} switchToVertical={switchToVertical} isMobile={isMobile} />
				</div>
			:
			<Grid spacing={2} container sx={{ height: "calc(100% - 70px)", p: 2 }}>
				<Grid size={8}>
					<FlyerEditor showFlyer={showFlyer} switchToVertical={switchToVertical} isMobile={isMobile} />
				</Grid>

				<Grid size={4}>
					<AIAssistant className="h-full" setShowFlyer={setShowFlyer} switchToVertical={switchToVertical} isMobile={isMobile} />
				</Grid>
			</Grid>
			}
            
        </div>
    );
};

export default FlyerGenerator;