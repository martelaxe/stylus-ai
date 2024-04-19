import React from 'react';
import { Typography, Button, Box } from '@mui/material';

const LandingPage = ({ onGetStartedClick }) => (
  <Box textAlign="center" p={5}>
    <Typography variant="h2" gutterBottom>
      Welcome to AI-Chain-APP
    </Typography>
    <Typography variant="h6" gutterBottom>
      The next generation platform for managing AI models on the blockchain.
    </Typography>
    <Button variant="contained" color="primary" size="large" onClick={onGetStartedClick}>
      Get Started
    </Button>
  </Box>
);

export default LandingPage;
