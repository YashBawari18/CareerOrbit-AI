import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="construction-container">
        <div className="construction-content">
          <div className="animation-box">
            <div className="crane">
              <div className="arm"></div>
              <div className="hook"></div>
            </div>
            <div className="building-blocks">
              <div className="block block-1"></div>
              <div className="block block-2"></div>
              <div className="block block-3"></div>
            </div>
          </div>
          
          <h1 className="construction-title">Trajectory Synchronizing...</h1>
          <p className="construction-text">
            Our AI is currently mapping this specific career vector. 
            This module is undergoing precision calibration for the next evolutionary phase.
          </p>
          
          <div className="construction-actions">
            <Link to="/" className="btn btn-primary">Back to Trajectory Hub</Link>
          </div>
        </div>
        
        <div className="bg-decorations">
          <div className="grid-line"></div>
          <div className="pulse-circle"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnderConstruction;
