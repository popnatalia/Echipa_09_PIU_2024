import React, { useState } from 'react';
import {
    Avatar,
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Paper,
} from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password || !confirmPassword) {
            setError('Please fill out all fields.');
        } else if (password !== confirmPassword) {
            setError('Passwords do not match.');
        } else {
            // Redirect to Welcome Page
            navigate('/welcome');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ marginTop: 8, padding: 4 }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <HowToRegIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ marginTop: 1 }}>
                        Register
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#6B48AD', color: '#fff' }}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;
