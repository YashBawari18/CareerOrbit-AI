import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="home-page">
            <Navbar />
            <main>
                <Hero />
                <FeatureSection />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
