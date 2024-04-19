import React from 'react';
import { Typography, Button } from '@mui/material';

const HeroSection = () => (
  <div style={{ padding: '40px 0' }}>
    <Typography variant="h3" gutterBottom>
      Revolutionize AI on Blockchain
    </Typography>
    <Typography variant="subtitle1" paragraph>
      Deploy and manage AI models securely and efficiently.
    </Typography>
    <Button variant="contained" color="primary">Get Started</Button>
  </div>
);

export default HeroSection;
