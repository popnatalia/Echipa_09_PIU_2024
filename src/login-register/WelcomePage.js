import React, { useState } from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, Paper, Button } from '@mui/material';
import Navbar from "../navbar/Navbar";

const WelcomePage = () => {
    const tasks = [
        { id: 1, name: 'Task 1', description: "Check John's Doe insulin level" },
        { id: 2, name: 'Task 2', description: "Check if prescribed medication to Mrs. Smith makes her feel better" },
        { id: 3, name: 'Task 3', description: "Record  vitals for Mr. Johnson" },
        { id: 4, name: 'Task 4', description: "See if Alice's heart beat is in normal range" },
        { id: 5, name: 'Task 5', description: "Error handling for Mrs. Smith bracelet" },
    ];


    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <Box sx={{ padding: 1, backgroundColor: 'white', minHeight: '100vh' }}>
            {/* navbar with current page set */}
            <Navbar currentPage="Welcome" />

            <Container>
                {/* header */}
                <Box sx={{ textAlign: 'center', marginTop: 6, marginBottom: 2 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Hello, Person!
                    </Typography>
                </Box>

                {/* task list */}
                <Paper
                    elevation={3}
                    sx={{
                        marginTop: 4,
                        padding: 2,
                        backgroundColor: '#fbefff',
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Here are your daily tasks:
                    </Typography>
                    <List>
                        {tasks.map((task) => (
                            <ListItem
                                key={task.id}
                                sx={{
                                    padding: 1,
                                    cursor: 'pointer',
                                    ':hover': { backgroundColor: '#e0e0e0' },
                                }}
                                onClick={() => setSelectedTask(task.description)} // set task description on click
                            >
                                <ListItemText primary={task.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>

                {/* display selected task */}
                {selectedTask && (
                    <Paper
                        elevation={3}
                        sx={{
                            marginTop: 4,
                            padding: 2,
                            backgroundColor: '#fff4e0',
                            borderRadius: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Task Details:
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {selectedTask}
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setSelectedTask(null)} // Clear task details
                        >
                            Close
                        </Button>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default WelcomePage;
