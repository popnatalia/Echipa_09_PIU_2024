import React from 'react';
import {Box, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Navbar = ({currentPage}) => {
    const pages = [
        'Dashboard',
        'Health Monitoring',
        'Alerts and Notifications',
        'Case Management',
        'Reporting',
        'Training Events',
        'Log out',
    ];
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: '#E8E2F3',
                height: '50px',
            }}
        >
            {pages.map((page) => (
                <Typography
                    key={page}
                    variant="body1"
                    onClick={() => navigate(`/${page.toLowerCase().replace(/ /g, '-')}`)}
                    sx={{
                        cursor: 'pointer',
                        padding: '6px 12px', // Adjusted padding for text
                        backgroundColor: currentPage === page ? '#d1c4e9' : 'transparent',
                        borderRadius: 4,
                        fontSize: '14px', // Slightly smaller text size
                        ':hover': {
                            backgroundColor: '#BCA6DD',
                        },
                    }}
                >
                    {page}
                </Typography>
            ))}
        </Box>
    );
};


export default Navbar;
