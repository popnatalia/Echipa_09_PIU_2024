import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Alerts = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([]);
    const [open, setOpen] = useState(false);
    const [newAlert, setNewAlert] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const people = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];
    const [isEditing, setIsEditing] = useState(false);
    const [firstAidText, setFirstAidText] = useState('First aid guidelines'); // Default guidelines

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewAlert('');
        setSelectedPerson('');
    };

    const handleAddAlert = () => {
        if (newAlert.trim() && selectedPerson) {
            setAlerts([...alerts, { text: newAlert, person: selectedPerson, done: false }]);
            handleClose();
        }
    };

    const handleToggle = (index) => {
        const updatedAlerts = alerts.map((alert, i) =>
            i === index ? { ...alert, done: !alert.done } : alert
        );
        updatedAlerts.sort((a, b) => a.done - b.done);
        setAlerts(updatedAlerts);
    };

    const handleMonitor = (person) => {
        // navigate(`/monitor/${encodeURIComponent(person)}`);
        console.log(`/monitor/${encodeURIComponent(person)}`);
    };

    const handleEditToggle = () => setIsEditing(!isEditing);
    const handleFirstAidChange = (e) => setFirstAidText(e.target.value);

    return (
        <Box sx={{ padding: 1, backgroundColor: 'white', minHeight: '100vh' }}>
            <Navbar currentPage="Alerts and Notifications" />
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', marginTop: 6, marginBottom: 2 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Alerts and Notifications Screen
                </Typography>
            </Box>

            {/* Create New Alert Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                <Button variant="contained" sx={{bgcolor: '#6B48AD', color: "#fff"}} onClick={handleOpen}>
                    Create new alert
                </Button>
            </Box>

            {/* Alerts List */}
            <Box sx={{ backgroundColor: '#fbefff', borderRadius: 2, padding: 2, marginBottom: 4 }}>
                <List>
                    {alerts.map((alert, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 1,
                                backgroundColor: alert.done ? '#e0e0e0' : 'inherit',
                                textDecoration: alert.done ? 'line-through' : 'none',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: '#d1c4e9' }}>
                                        {alert.person.charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <Typography>
                                    {alert.text} ({alert.person})
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleMonitor(alert.person)}
                                >
                                    Monitor
                                </Button>
                                <Checkbox
                                    checked={alert.done}
                                    onChange={() => handleToggle(index)}
                                    inputProps={{ 'aria-label': `Mark ${alert.text} as done` }}
                                />
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* First Aid Guidelines Section */}
            <Box sx={{ marginTop: 4, paddingRight: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        First Aid Guidelines
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleEditToggle}
                        sx={{ marginLeft: 'auto', bgcolor: '#6B48AD', color: "#fff" }}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                </Box>
                <Box
                    component={isEditing ? 'textarea' : 'div'}
                    contentEditable={isEditing}
                    sx={{
                        backgroundColor: isEditing ? '#ffffff' : '#e8eaf6',
                        border: isEditing ? '1px solid #000000' : 'none',
                        borderRadius: 2,
                        padding: 2,
                        height: '200px',
                        width: '100%',
                        textAlign: isEditing ? 'start' : 'center',
                        display: 'flex',
                        alignItems: isEditing ? 'start' : 'center',
                        justifyContent: isEditing ? 'start' : 'center',
                        overflowY: 'auto',
                        resize: 'none',
                    }}
                    value={isEditing ? firstAidText : undefined}
                    onChange={isEditing ? handleFirstAidChange : undefined}
                    suppressContentEditableWarning
                >
                    {!isEditing ? firstAidText : undefined}
                </Box>
            </Box>

            {/* Popup Dialog for Creating New Alert */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogContent>
                    {/* Input for Alert Title */}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Alert Title"
                        fullWidth
                        value={newAlert}
                        onChange={(e) => setNewAlert(e.target.value)}
                    />

                    {/* Dropdown for Selecting a Person */}
                    <FormControl fullWidth sx={{ marginTop: 2 }}>
                        <InputLabel>Person</InputLabel>
                        <Select
                            value={selectedPerson}
                            onChange={(e) => setSelectedPerson(e.target.value)}
                            displayEmpty
                        >
                            {people.map((person, index) => (
                                <MenuItem key={index} value={person}>
                                    {person}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddAlert} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Alerts;

