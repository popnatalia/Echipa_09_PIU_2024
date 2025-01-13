import React, { useState } from 'react';
import { Box, Typography, Container, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import Navbar from '../navbar/Navbar';

const TrainingEvents = () => {
    // state for tracking if all events are shown
    const [showAllEvents, setShowAllEvents] = useState(false);

    // data for past events
    const pastEvents = [
        { id: 1, name: 'Event 1', description: 'Advanced Diabetes Training' },
        { id: 2, name: 'Event 2', description: 'Heart Health Workshop' },
        { id: 3, name: 'Event 3', description: 'Mental Health Awareness' },
        { id: 4, name: 'Event 4', description: 'Emergency Response Simulation' },
        { id: 5, name: 'Event 5', description: 'Patient Care Best Practices' },
    ];

    return (
        <Box sx={{ padding: 1, backgroundColor: 'white', minHeight: '100vh' }}>
            {/* Navbar */}
            <Navbar currentPage="Training Events" />

            <Container>
                {/* Header */}
                <Box sx={{ textAlign: 'center', marginTop: 6, marginBottom: 2 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Training Events Screen
                    </Typography>
                    {!showAllEvents ? (
                        <Button
                            variant="contained"
                            sx={{ marginTop: 2, backgroundColor: '#6B48AD', color: '#fff' }}
                            onClick={() => setShowAllEvents(true)} // show all events
                        >
                            View All Events
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ marginTop: 2, backgroundColor: '#FF6B6B', color: '#fff' }}
                            onClick={() => setShowAllEvents(false)} // hide all events
                        >
                            Close All Events
                        </Button>
                    )}
                </Box>

                {/* Past Events Section */}
                {showAllEvents && (
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
                            Here are all the past events:
                        </Typography>
                        <List>
                            {pastEvents.map((event) => (
                                <ListItem
                                    key={event.id}
                                    sx={{
                                        padding: 1,
                                        ':hover': { backgroundColor: '#e0e0e0' },
                                    }}
                                >
                                    <ListItemText
                                        primary={event.name}
                                        secondary={event.description} // display event description
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default TrainingEvents;
