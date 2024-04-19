import React, { useState } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AIModelManager from './components/AIModelManager'; // Correctly importing AIModelManager component
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);  // When "Get Started" is clicked, show the main content
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            AI-Chain-APP
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        {!showDashboard ? (
          <LandingPage onGetStartedClick={handleGetStarted} />
        ) : (
          <>
            <HeroSection />
            <FeaturesSection />
            <AIModelManager />  // Ensure the component is correctly used
          </>
        )}
        <Footer />
      </Container>
    </>
  );
}

export default App;
