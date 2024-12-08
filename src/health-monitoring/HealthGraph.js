import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import { Box, Button } from "@mui/material";
import "chart.js/auto";

const HealthGraph = () => {
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [visibleCategories, setVisibleCategories] = useState({
        "Pulse (bpm)": true,
        "Systolic BP": true,
        "Diastolic BP": true,
        "Oxygen Saturation (%)": true,
        "Temperature (C)": true,
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/health_data.csv");
            const reader = response.body.getReader();
            const result = await reader.read();
            const text = new TextDecoder().decode(result.value);

            Papa.parse(text, {
                header: true,
                skipEmptyLines: true,
                complete: (result) => {
                    setData(result.data);
                    setStartTime(new Date());
                },
            });
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length === 0 || !startTime) return;

        const interval = setInterval(() => {
            const newEntry = data[currentIndex];
            if (!newEntry) return;

            const newTimestamp = new Date(
                startTime.getTime() + currentIndex * 2 * 60 * 1000
            )
                .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"});

            setGraphData((prev) => [
                ...prev,
                {
                    timestamp: newTimestamp, // Dynamic timestamp
                    pulse: Number(newEntry["Pulse (bpm)"]),
                    systolicBP: Number(newEntry["Systolic BP"]),
                    diastolicBP: Number(newEntry["Diastolic BP"]),
                    oxygen: Number(newEntry["Oxygen Saturation (%)"]),
                    temperature: Number(newEntry["Temperature (C)"]),
                },
            ]);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 2000);

        return () => clearInterval(interval);
    }, [data, startTime, currentIndex]);

    const toggleCategoryVisibility = (category) => {
        setVisibleCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const chartData = {
        labels: graphData.map((entry) => entry.timestamp),
        datasets: [
            {
                label: "Pulse (bpm)",
                data: graphData.map((entry) => entry.pulse),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                tension: 0.4,
                hidden: !visibleCategories["Pulse (bpm)"],
            },
            {
                label: "Systolic BP",
                data: graphData.map((entry) => entry.systolicBP),
                borderColor: "rgba(255,99,132,1)",
                backgroundColor: "rgba(255,99,132,0.2)",
                tension: 0.4,
                hidden: !visibleCategories["Systolic BP"],
            },
            {
                label: "Diastolic BP",
                data: graphData.map((entry) => entry.diastolicBP),
                borderColor: "rgba(54,162,235,1)",
                backgroundColor: "rgba(54,162,235,0.2)",
                tension: 0.4,
                hidden: !visibleCategories["Diastolic BP"],
            },
            {
                label: "Oxygen Saturation (%)",
                data: graphData.map((entry) => entry.oxygen),
                borderColor: "rgba(153,102,255,1)",
                backgroundColor: "rgba(153,102,255,0.2)",
                tension: 0.4,
                hidden: !visibleCategories["Oxygen Saturation (%)"],
            },
            {
                label: "Temperature (C)",
                data: graphData.map((entry) => entry.temperature),
                borderColor: "rgba(255,159,64,1)",
                backgroundColor: "rgba(255,159,64,0.2)",
                tension: 0.4,
                hidden: !visibleCategories["Temperature (C)"],
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: { display: true, text: "Time" },
            },
            y: {
                title: { display: true, text: "Values" },
            },
        },
    };

    return (
        <Box sx={{ width: "80%", margin: "auto", padding: "20px" }}>
            <Box sx={{ textAlign: "center", marginBottom: 3 }}>
                {["Pulse (bpm)", "Systolic BP", "Diastolic BP", "Oxygen Saturation (%)", "Temperature (C)"].map((category) => (
                    <Button
                        key={category}
                        onClick={() => toggleCategoryVisibility(category)}
                        sx={{
                            backgroundColor: visibleCategories[category] ? {
                                "Pulse (bpm)": "rgba(75,192,192,1)",
                                "Systolic BP": "rgba(255,99,132,1)",
                                "Diastolic BP": "rgba(54,162,235,1)",
                                "Oxygen Saturation (%)": "rgba(153,102,255,1)",
                                "Temperature (C)": "rgba(255,159,64,1)",
                            }[category] : "rgba(0,0,0,0.1)",
                            color: "#fff",
                            margin: "0 5px",
                            borderRadius: "20px",
                            padding: "10px 20px",
                            textTransform: "none",
                            "&:hover": {
                                backgroundColor: visibleCategories[category] ? {
                                    "Pulse (bpm)": "rgba(75,192,192,0.8)",
                                    "Systolic BP": "rgba(255,99,132,0.8)",
                                    "Diastolic BP": "rgba(54,162,235,0.8)",
                                    "Oxygen Saturation (%)": "rgba(153,102,255,0.8)",
                                    "Temperature (C)": "rgba(255,159,64,0.8)",
                                }[category] : "rgba(0,0,0,0.2)",
                            },
                        }}
                    >
                        {visibleCategories[category] ? "Hide " : "Show "} {category}
                    </Button>
                ))}
            </Box>

            {/* Graph */}
            <Line data={chartData} options={options} />
        </Box>
    );
};

export default HealthGraph;
