import React from 'react';
import './FeatureSection.css';

const FeatureSection = () => {
    const features = [
        {
            icon: '📊',
            title: 'Track Skill Obsolescence',
            desc: 'Real-time monitoring of your skill portfolio against market demand and decay rates.'
        },
        {
            icon: '🚀',
            title: 'AI Career Pathing',
            desc: 'Discover hidden opportunities with our non-linear trajectory engine.'
        },
        {
            icon: '🎓',
            title: 'Precision Upskilling',
            desc: 'Get personalized learning paths that bridge the gap to your future role.'
        }
    ];

    return (
        <section className="features section-padding">
            <div className="container">
                <div className="section-header text-center mb-4">
                    <h2>Future-Proof Your Career</h2>
                    <p>The only platform that adapts as fast as technology does.</p>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => (
                        <div className="feature-card" key={i}>
                            <div className="feature-icon">{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
