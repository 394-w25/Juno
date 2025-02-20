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
				<div
					className="flex flex-col h-[calc(100vh-70px)]"	
				>
					<FlyerEditor showFlyer={showFlyer} isMobile={isMobile} />

					<AIAssistant setShowFlyer={setShowFlyer} isMobile={isMobile} />
				</div>
			:
			<Grid spacing={2} container sx={{ height: "calc(100% - 70px)", p: 2 }}>
				<Grid size={8}>
					<FlyerEditor showFlyer={showFlyer} isMobile={isMobile} />
				</Grid>

				<Grid size={4}>
					<AIAssistant className="h-full" setShowFlyer={setShowFlyer} isMobile={isMobile} />
				</Grid>
			</Grid>
			}
            
        </div>
    );
};

export default FlyerGenerator;