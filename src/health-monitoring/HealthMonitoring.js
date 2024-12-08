import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import {Delete as DeleteIcon} from "@mui/icons-material";
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import HealthGraph from "./HealthGraph";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HealthMonitoring = () => {
    const [openDialog, setOpenDialog] = useState(true);
    const [selectedUser, setSelectedUser] = useState("");
    const [users] = useState(["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown"]);
    const [interventions, setInterventions] = useState([
        "Hypertension",
        "Type 2 Diabetes",
        "Asthma",
        "Allergies: Penicillin",
        "BloodType: O+",
    ]);
    const [newIntervention, setNewIntervention] = useState("");

    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const handleAddIntervention = () => {
        if (newIntervention) {
            setInterventions((prev) => [...prev, newIntervention]);
            setNewIntervention("");
        }
    };

    const handleRemoveIntervention = (index) => {
        const updatedInterventions = interventions.filter((_, i) => i !== index);
        setInterventions(updatedInterventions);
    };

    const handleIconClick = (iconName) => {
        switch (iconName) {
            case 'phone':
                toast.info("Initiating call to the patient's emergency contact...", {autoClose: 2000})
                break;
            case 'announcement':
                toast.success('An error report has been sent to the IT department.\n Please wait for further instructions', {autoClose: 2000});
                break;
            case 'support':
                toast.success('A volunteer has been dispatched to the patient\'s location.', {autoClose: 2000});
                break;
            default:
                toast('Icon clicked!', {autoClose: 3000});
        }
    };

    if (!selectedUser) {
        return (
            <Box sx={{padding: 1, minHeight: "100vh"}}>
                <Navbar currentPage="Health Monitoring"/>
                <Dialog
                    open={openDialog}
                    disableEscapeKeyDown
                    onClose={(event, reason) => {
                        if (reason !== "backdropClick") {
                            handleClose();
                        }
                    }}
                    PaperProps={{
                        sx: {
                            minWidth: "400px",
                            borderRadius: "16px",
                            boxShadow: 3,
                        },
                    }}
                >
                    <DialogTitle sx={{color: "#6B48AD"}}>Select a User</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Select User</InputLabel>
                            <Select
                                value={selectedUser}
                                onChange={handleUserChange}
                                label="Select User"
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    '& .MuiInputBase-root': {
                                        color: "#6B48AD",
                                    },
                                }}
                            >
                                {users.map((user, index) => (
                                    <MenuItem key={index} value={user}>
                                        {user}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                </Dialog>
            </Box>
        );
    }

    return (
        <Box sx={{padding: 1, minHeight: "100vh"}}>
            <Navbar currentPage="Health Monitoring"/>
            <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    zIndex: 1200,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    backgroundColor: "#987EC9",
                    padding: 0.5,
                    borderRadius: "12px",
                    boxShadow: 3,
                }}
            >
                <IconButton
                    sx={{
                        color: "#fff",
                        backgroundColor: "#5a38a1",
                        borderRadius: "8px",
                        padding: 1.5,
                        '&:hover': {
                            backgroundColor: "#4c2d7b",
                        },
                    }}
                    onClick={() => handleIconClick('phone')}
                >
                    <PhoneInTalkOutlinedIcon sx={{fontSize: 24}}/>
                </IconButton>
                <IconButton
                    sx={{
                        color: "#fff",
                        backgroundColor: "#5a38a1",
                        borderRadius: "8px",
                        padding: 1.5,
                        '&:hover': {
                            backgroundColor: "#4c2d7b",
                        },
                    }}
                    onClick={() => handleIconClick('announcement')}
                >
                    <AnnouncementOutlinedIcon sx={{fontSize: 24}}/>
                </IconButton>
                <IconButton
                    sx={{
                        color: "#fff",
                        backgroundColor: "#5a38a1",
                        borderRadius: "8px",
                        padding: 1.5,
                        '&:hover': {
                            backgroundColor: "#4c2d7b",
                        },
                    }}
                    onClick={() => handleIconClick('support')}
                >
                    <SupportAgentIcon sx={{fontSize: 24}}/>
                </IconButton>
            </Box>

            <Box sx={{padding: 2}}>
                <Typography variant="h4" sx={{
                    color: "#6B48AD",
                    fontWeight: "bold",
                    marginTop: 4,
                    textAlign: 'center',
                    width: '100%',
                }}>
                    Monitoring for {selectedUser}
                </Typography>
                <HealthGraph/>
                <Box sx={{marginTop: 3, backgroundColor: "#fff", padding: 3, borderRadius: "12px", boxShadow: 2}}>
                    <Typography variant="h6" sx={{color: "#6B48AD"}}>Patient Info</Typography>
                    <Box sx={{display: "flex", flexDirection: "column", gap: 2, marginTop: 2}}>
                        <TextField
                            label="New information to add to patient's profile"
                            variant="outlined"
                            fullWidth
                            value={newIntervention}
                            onChange={(e) => setNewIntervention(e.target.value)}
                            sx={{
                                borderRadius: "8px",
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: "#6B48AD",
                                    },
                                    '&:hover fieldset': {
                                        borderColor: "#5a38a1",
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#6B48AD",
                                color: "#fff",
                                '&:hover': {
                                    backgroundColor: "#5a38a1",
                                },
                            }}
                            onClick={handleAddIntervention}
                            disabled={!newIntervention}
                        >
                            Add patient info
                        </Button>
                        <List>
                            {interventions.map((intervention, index) => (
                                <ListItem key={index} sx={{display: "flex", alignItems: "center"}}>
                                    <ListItemText primary={intervention}/>
                                    <IconButton
                                        edge="end"
                                        onClick={() => handleRemoveIntervention(index)}
                                        color="secondary"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: "#eee",
                                            },
                                        }}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Box>

            <ToastContainer/>
        </Box>
    );
};

export default HealthMonitoring;
