import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import { getModelState, updateModelState } from '../utils/contractInteractions';

const AIModelManager = () => {
    const [currentState, setCurrentState] = useState('');
    const [newState, setNewState] = useState('');

    const handleGetState = async () => {
        const state = await getModelState();
        setCurrentState(state);
    };

    const handleUpdateState = async () => {
        // Update to handle MetaMask transaction signing
        const updateStatus = await updateModelState(newState);
        alert(updateStatus);
        handleGetState();  // Refresh the displayed state after the update
    };

    return (
        <Box sx={{ margin: '20px', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>AI Model Control Panel</Typography>
            <Button variant="outlined" onClick={handleGetState}>Get Current Model State</Button>
            <Typography sx={{ my: 2 }}>{currentState}</Typography>
            <TextField
                label="New AI Model State"
                variant="outlined"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleUpdateState} sx={{ mt: 2 }}>
                Update Model State
            </Button>
        </Box>
    );
};

export default AIModelManager;
