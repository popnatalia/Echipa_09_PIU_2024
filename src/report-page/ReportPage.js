import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, Card, CardContent, CircularProgress, Grid, TextField } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import ReportIcon from '@mui/icons-material/Assessment';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from "../navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportPage = () => {
    const [reports, setReports] = useState(() => {
        const savedReports = sessionStorage.getItem("reports");
        return savedReports ? JSON.parse(savedReports) : [
            { id: 1, name: "Report 1", date: "12/7/2024", file: "report_1.pdf" },
            { id: 2, name: "Report 2", date: "12/8/2024", file: "report_2.pdf" },
            { id: 3, name: "Report 3", date: "12/9/2024", file: "report_3.pdf" },
        ];
    });

    const [isLoading, setIsLoading] = useState(false);
    const [newFeedback, setNewFeedback] = useState("");
    const [feedbackList, setFeedbackList] = useState(() => {
        const savedFeedback = sessionStorage.getItem("feedbackList");
        return savedFeedback ? JSON.parse(savedFeedback) : [
            { id: 1, name: 'User', feedback: "Great work!" },
        ];
    });

    const userName = sessionStorage.getItem("username") || "Anonymous";
    const userRole = sessionStorage.getItem("role");

    useEffect(() => {
        sessionStorage.setItem("reports", JSON.stringify(reports));
    }, [reports]);

    useEffect(() => {
        sessionStorage.setItem("feedbackList", JSON.stringify(feedbackList));
    }, [feedbackList]);

    const handleGenerateReport = () => {
        setIsLoading(true);
        setTimeout(() => {
            const newReport = {
                id: reports.length + 1,
                name: `Report ${reports.length + 1}`,
                date: new Date().toLocaleDateString(),
                file: `report_${reports.length + 1}.pdf`,
            };
            setReports((prevReports) => [...prevReports, newReport]);
            setIsLoading(false);
            toast.success("New report generated successfully!");
        }, 2000);
    };

    const handleDownloadReport = (fileName) => {
        toast.info(`Downloading ${fileName}...`);
    };

    const handleAddFeedback = () => {
        if (newFeedback.trim() !== "") {
            setFeedbackList((prevFeedbacks) => [
                ...prevFeedbacks,
                { id: feedbackList.length + 1, name: userName, feedback: newFeedback }
            ]);
            setNewFeedback("");
            toast.success("Feedback sent successfully!");
        }
    };

    const handleDeleteReport = (id) => {
        setReports((prevReports) => prevReports.filter(report => report.id !== id));
        toast.warn("Report deleted.");
    };

    return (
        <Box sx={{ padding: 2, minHeight: "100vh", backgroundColor: "#f3f2f5" }}>
            <Navbar currentPage="Reports and Feedback" />

            <ToastContainer position="top-right" autoClose={3000} />

            <Typography variant="h4" sx={{ color: "#6B48AD", fontWeight: "bold", marginTop: 4, textAlign: "center" }}>
                Reports
            </Typography>

            {userRole === "admin" && (
                <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4, marginTop: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateReport}
                        sx={{
                            backgroundColor: "#6B48AD",
                            color: "#fff",
                            '&:hover': {
                                backgroundColor: "#5a38a1",
                            },
                        }}
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={24} color="inherit" /> : <ReportIcon />}
                    >
                        {isLoading ? "Generating Report..." : "Generate Report"}
                    </Button>
                </Box>
            )}

            <Box sx={{ marginTop: 4, width: "100%" }}>
                <Typography variant="h6" sx={{ color: "#6B48AD", fontWeight: "bold", marginBottom: 2 }}>
                    Previous Reports
                </Typography>
                <Grid container spacing={3}>
                    {reports.map((report) => (
                        <Grid item xs={12} sm={6} md={4} key={report.id}>
                            <Card sx={{ boxShadow: 3, borderRadius: "8px", backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ color: "#6B48AD", fontWeight: "bold" }}>
                                        {report.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                        Date: {report.date}
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
                                        <IconButton onClick={() => handleDownloadReport(report.file)}>
                                            <DownloadIcon sx={{ color: "#6B48AD" }} />
                                        </IconButton>
                                        {userRole === "admin" && (
                                            <IconButton onClick={() => handleDeleteReport(report.id)}>
                                                <DeleteIcon sx={{ color: "#6B48AD" }} />
                                            </IconButton>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {userRole === "user" && (
                <Box sx={{ marginTop: 6, width: "100%" }}>
                    <Typography variant="h4" sx={{ color: "#6B48AD", fontWeight: "bold", marginBottom: 2, textAlign: "center" }}>
                        Volunteer Feedback
                    </Typography>

                    <TextField
                        label="Enter your feedback"
                        multiline
                        rows={4}
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        variant="outlined"
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleAddFeedback}
                        sx={{
                            backgroundColor: "#6B48AD",
                            color: "#fff",
                            '&:hover': {
                                backgroundColor: "#5a38a1",
                            },
                        }}
                        disabled={newFeedback.trim() === ""}
                    >
                        Submit Feedback
                    </Button>
                </Box>
            )}
            {userRole === "admin" && (
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6" sx={{ color: "#6B48AD", fontWeight: "bold", marginBottom: 2 }}>
                        Previous Feedback
                    </Typography>
                    <Grid container spacing={3}>
                        {feedbackList.map((feedback) => (
                            <Grid item xs={12} sm={6} md={4} key={feedback.id}>
                                <Card sx={{ boxShadow: 3, borderRadius: "8px", backgroundColor: "#fff" }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ color: "#6B48AD", fontWeight: "bold" }}>
                                            {feedback.name}'s Feedback
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                                            {feedback.feedback}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default ReportPage;
