import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Container,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';

// Case Management Page
const CaseManagement = () => {
    const [cases, setCases] = useState([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);

    const [newCase, setNewCase] = useState({
        name: '',
        address: '',
        contactPersons: [{ name: '', phone: '', relation: '' }],
    });

    const relations = ['Family Member', 'Friend', 'Neighbor', 'Coworker', 'Other'];

    const handleAddCase = () => {
        setCases([...cases, { ...newCase, id: cases.length + 1 }]);
        setOpenAddDialog(false);
        setNewCase({
            name: '',
            address: '',
            contactPersons: [{ name: '', phone: '', relation: '' }],
        });
    };

    const handleEditCase = () => {
        const updatedCases = cases.map((caseItem) =>
            caseItem.id === selectedCase.id ? selectedCase : caseItem
        );
        setCases(updatedCases);
        setOpenEditDialog(false);
    };

    const handleAddContactPerson = (caseObject, setCaseObject) => {
        setCaseObject({
            ...caseObject,
            contactPersons: [
                ...caseObject.contactPersons,
                { name: '', phone: '', relation: '' },
            ],
        });
    };

    const handleCaseChange = (caseObject, setCaseObject, field, value) => {
        setCaseObject({ ...caseObject, [field]: value });
    };

    const handleContactPersonChange = (caseObject, setCaseObject, index, field, value) => {
        const updatedContacts = caseObject.contactPersons.map((contact, i) =>
            i === index ? { ...contact, [field]: value } : contact
        );
        setCaseObject({ ...caseObject, contactPersons: updatedContacts });
    };

    const navigate = useNavigate();

    return (
        <Box sx={{ padding: 1, backgroundColor: 'white', minHeight: '100vh' }}>
            <Navbar currentPage="Case Management" />
            <Container>
                {/* Header */}
                <Box sx={{ textAlign: 'center', marginTop: 6, marginBottom: 2 }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Case Management Screen
                    </Typography>
                </Box>


                {/* Create New Case Button */}
                <Box sx={{ textAlign: 'center', marginY: 4 }}>
                    <Button
                        variant="contained"
                        sx={{bgcolor: '#6B48AD', color: "#fff" }}
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Create new case
                    </Button>
                </Box>

                {/* Case List */}
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Here are the active cases:
                    </Typography>
                    <Box sx={{ backgroundColor: '#fbefff', borderRadius: 2, padding: 2 }}>
                        <List>
                            {cases.map((caseItem) => (
                                <ListItem
                                    key={caseItem.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 1,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        setSelectedCase(caseItem);
                                        setOpenEditDialog(true);
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ backgroundColor: '#d1c4e9' }}>
                                                {caseItem.name.charAt(0)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <Typography>{caseItem.name}</Typography>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering the ListItem's onClick
                                            navigate(`/monitoring/${caseItem.id}`);
                                        }}
                                    >
                                        Monitor
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>

                {/* Add Case Dialog */}
                <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth>
                    <DialogTitle>Create New Case</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            value={newCase.name}
                            onChange={(e) => handleCaseChange(newCase, setNewCase, 'name', e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Address"
                            value={newCase.address}
                            onChange={(e) =>
                                handleCaseChange(newCase, setNewCase, 'address', e.target.value)
                            }
                        />

                        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                            Contact Person(s)
                        </Typography>
                        {newCase.contactPersons.map((contact, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Name"
                                    value={contact.name}
                                    onChange={(e) =>
                                        handleContactPersonChange(
                                            newCase,
                                            setNewCase,
                                            index,
                                            'name',
                                            e.target.value
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Phone"
                                    value={contact.phone}
                                    onChange={(e) =>
                                        handleContactPersonChange(
                                            newCase,
                                            setNewCase,
                                            index,
                                            'phone',
                                            e.target.value
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    select
                                    margin="normal"
                                    label="Relation"
                                    value={contact.relation}
                                    onChange={(e) =>
                                        handleContactPersonChange(
                                            newCase,
                                            setNewCase,
                                            index,
                                            'relation',
                                            e.target.value
                                        )
                                    }
                                >
                                    {relations.map((relation) => (
                                        <MenuItem key={relation} value={relation}>
                                            {relation}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        ))}

                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ marginTop: 2 }}
                            onClick={() => handleAddContactPerson(newCase, setNewCase)}
                        >
                            Add Contact Person
                        </Button>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                        <Button onClick={handleAddCase} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Edit Case Dialog */}
                <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth>
                    <DialogTitle>Edit Case</DialogTitle>
                    <DialogContent>
                        {selectedCase && (
                            <>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Name"
                                    value={selectedCase.name}
                                    onChange={(e) =>
                                        handleCaseChange(
                                            selectedCase,
                                            setSelectedCase,
                                            'name',
                                            e.target.value
                                        )
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Address"
                                    value={selectedCase.address}
                                    onChange={(e) =>
                                        handleCaseChange(
                                            selectedCase,
                                            setSelectedCase,
                                            'address',
                                            e.target.value
                                        )
                                    }
                                />

                                <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                                    Contact Person(s)
                                </Typography>
                                {selectedCase.contactPersons.map((contact, index) => (
                                    <Box key={index} sx={{ marginBottom: 2 }}>
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="Name"
                                            value={contact.name}
                                            onChange={(e) =>
                                                handleContactPersonChange(
                                                    selectedCase,
                                                    setSelectedCase,
                                                    index,
                                                    'name',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <TextField
                                            fullWidth
                                            margin="normal"
                                            label="Phone"
                                            value={contact.phone}
                                            onChange={(e) =>
                                                handleContactPersonChange(
                                                    selectedCase,
                                                    setSelectedCase,
                                                    index,
                                                    'phone',
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <TextField
                                            fullWidth
                                            select
                                            margin="normal"
                                            label="Relation"
                                            value={contact.relation}
                                            onChange={(e) =>
                                                handleContactPersonChange(
                                                    selectedCase,
                                                    setSelectedCase,
                                                    index,
                                                    'relation',
                                                    e.target.value
                                                )
                                            }
                                        >
                                            {relations.map((relation) => (
                                                <MenuItem key={relation} value={relation}>
                                                    {relation}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Box>
                                ))}

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ marginTop: 2 }}
                                    onClick={() =>
                                        handleAddContactPerson(selectedCase, setSelectedCase)
                                    }
                                >
                                    Add Contact Person
                                </Button>
                            </>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                        <Button onClick={handleEditCase} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
};

export default CaseManagement;
