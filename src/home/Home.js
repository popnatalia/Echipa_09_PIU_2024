import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper } from '@mui/material';

const Home = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin');
        window.location.reload();
    };

    const handleRegister = () => {
        navigate('/register');
        window.location.reload();
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                padding: 2,
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={12}
                    sx={{
                        padding: 5,
                        borderRadius: 4,
                        textAlign: 'center',
                        backgroundColor: '#fff',
                        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-10px)',
                            boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.3)',
                        },
                    }}
                >
                    <Typography
                        variant="h3"
                        gutterBottom
                        sx={{
                            fontWeight: '700',
                            color: '#6B48AD',
                            marginBottom: 3,
                        }}
                    >
                        Welcome to Our App
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: '#666',
                            marginBottom: 4,
                            fontSize: '1.1rem',
                            lineHeight: 1.6,
                        }}
                    >
                        Sign in to explore or register to get started!
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleSignIn}
                            sx={{
                                backgroundColor: '#6B48AD',
                                color: '#fff',
                                fontWeight: 'bold',
                                padding: '12px 30px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#5a38a1',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Sign In
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={handleRegister}
                            sx={{
                                color: '#6B48AD',
                                borderColor: '#6B48AD',
                                fontWeight: 'bold',
                                padding: '12px 30px',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    borderColor: '#5a38a1',
                                    backgroundColor: '#f3f0fa',
                                    transform: 'scale(1.05)',
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Home;
