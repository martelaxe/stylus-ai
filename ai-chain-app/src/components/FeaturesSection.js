import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const features = [
  { title: 'Decentralization', description: 'Experience unparalleled security and resilience with decentralized AI model management.' },
  { title: 'Scalability', description: 'Effortlessly scale your AI applications across multiple blockchain nodes.' },
  { title: 'Efficiency', description: 'Reduce costs with efficient AI processing on a blockchain infrastructure.' },
];

const FeaturesSection = () => (
  <Grid container spacing={4}>
    {features.map((feature, index) => (
      <Grid item xs={12} sm={4} key={index}>
        <Card>
          <CardContent>
            <Typography variant="h5">{feature.title}</Typography>
            <Typography>{feature.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default FeaturesSection;
