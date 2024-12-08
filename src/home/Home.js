import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const Home = () => {
    const history = useNavigate();

    const handleSignIn = () => {
        history('/signin');
        window.location.reload();
    };

    const handleRegister = () => {
        history('/register');
        window.location.reload();
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h3" gutterBottom>
                Welcome to our app
            </Typography>
            <Typography variant="body1" mb={3}>
                Please sign in first
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSignIn}>
                    Sign In
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleRegister}>
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
