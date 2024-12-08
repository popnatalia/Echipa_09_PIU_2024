import Navbar from "../navbar/Navbar";
import React from "react";
import {Box} from "@mui/material";

const Dashboard = () => {
    return (
        <Box sx={{ padding: 1, backgroundColor: 'white', minHeight: '100vh' }}>
            <Navbar currentPage="Dashboard" />
        </Box>
    );

}

export default Dashboard;