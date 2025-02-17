import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import DrawIcon from '@mui/icons-material/Draw';
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleFlyerGenerator = (event) => {
        navigate("/flyer-generator")
    }

    const handleInsights = (event) => {
        navigate("/insights")
    }

    return (
        <AppBar position="static" color="default" sx={{ boxShadow: "none", borderBottom: "1px solid #ddd", p: 1 }}>
            <Toolbar>
                {/* Logo Image */}
                <a href="/">
                    <Box component="img" src={logo} alt="Logo" sx={{ height: 40, mr: 2 }} />
                </a>

                {/* Navigation Icons */}
                <IconButton color="primary">
                    <DashboardIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => {handleInsights();}}>
                    <LightbulbIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => {handleFlyerGenerator();}}>
                    <DrawIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;