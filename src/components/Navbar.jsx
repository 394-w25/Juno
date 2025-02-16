import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: "none", borderBottom: "1px solid #ddd", p: 1 }}>
            <Toolbar>
                {/* Logo Image */}
                <Box component="img" src={logo} alt="Logo" sx={{ height: 40, mr: 2 }} />

                {/* Navigation Icons */}
                <IconButton color="primary">
                    <DashboardIcon />
                </IconButton>
                <IconButton color="primary">
                    <LightbulbIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;