import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './SkillDecay.css';

const SkillDecay = () => {
    const skills = [
        {
            skill: 'JavaScript',
            lastUsed: '1 week ago',
            decayRate: 5,
            halfLife: '5 years',
            status: 'healthy',
            recommendation: 'Keep practicing regularly'
        },
        {
            skill: 'React',
            lastUsed: '2 days ago',
            decayRate: 3,
            halfLife: '4 years',
            status: 'healthy',
            recommendation: 'Excellent! Stay current with new features'
        },
        {
            skill: 'Angular',
            lastUsed: '8 months ago',
            decayRate: 45,
            halfLife: '2 years',
            status: 'at-risk',
            recommendation: 'Refresh needed - Take a refresher course'
        },
        {
            skill: 'Vue.js',
            lastUsed: '6 months ago',
            decayRate: 35,
            halfLife: '3 years',
            status: 'warning',
            recommendation: 'Build a small project to refresh'
        },
        {
            skill: 'jQuery',
            lastUsed: '2 years ago',
            decayRate: 75,
            halfLife: '1 year',
            status: 'critical',
            recommendation: 'Consider if this skill is still relevant'
        }
    ];

    const getStatusColor = (status) => {
        if (status === 'healthy') return 'success';
        if (status === 'warning') return 'warning';
        if (status === 'at-risk') return 'blue';
        return 'danger';
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="decay-page">
                <PageHeader
                    title="Obsolescence Analysis"
                    subtitle="Monitor the half-life of your expertise and prevent professional decay."
                    badge="Skill Maintenance"
                />

                <section className="decay-content section-padding">
                    <div className="container">

                        <div className="decay-insight-card glass-card p-8 mb-8">
                            <h2 className="mb-4">Calculated Half-Life</h2>
                            <p className="mb-0">
                                Skills degrade exponentially without active application. Our engine monitors your usage patterns
                                to predict when your proficiency will drop below market standards.
                                <strong> Prevention is more efficient than relearning.</strong>
                            </p>
                        </div>

                        <div className="skills-decay-grid">
                            {skills.map(item => (
                                <div key={item.skill} className={`decay-card-ui glass-card p-6 ${item.status}`}>
                                    <div className="dc-header mb-4">
                                        <h3>{item.skill}</h3>
                                        <div className={`status-pill ${item.status}`}>
                                            {item.status === 'healthy' && 'Stable'}
                                            {item.status === 'warning' && 'Wear detected'}
                                            {item.status === 'at-risk' && 'High Decay'}
                                            {item.status === 'critical' && 'Obsolescent'}
                                        </div>
                                    </div>

                                    <div className="dc-metrics grid-2 mb-6">
                                        <div className="dc-metric">
                                            <span>Last Verified</span>
                                            <strong>{item.lastUsed}</strong>
                                        </div>
                                        <div className="dc-metric">
                                            <span>Est. Half-Life</span>
                                            <strong>{item.halfLife}</strong>
                                        </div>
                                    </div>

                                    <div className="dc-meter mb-6">
                                        <div className="meter-info mb-2">
                                            <span>Integrity level</span>
                                            <strong>{100 - item.decayRate}%</strong>
                                        </div>
                                        <ProgressBar
                                            percentage={100 - item.decayRate}
                                            color={getStatusColor(item.status)}
                                            showLabel={false}
                                            height="medium"
                                        />
                                    </div>

                                    <div className="dc-recommendation p-4 rounded mb-4">
                                        <p className="mb-0 small">💡 {item.recommendation}</p>
                                    </div>

                                    {item.status !== 'healthy' && (
                                        <Link to="/learning/courses" className="btn btn-primary full-width">Refresh Skill Path →</Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="maintenance-section text-center mt-8 p-8 glass-card">
                            <h2 className="mb-4">Maintain Peak Proficiency</h2>
                            <p className="mb-6">Set up intelligent reminders to revisit core concepts before they fade.</p>
                            <button className="btn btn-primary btn-lg">Activate Maintenance Mode</button>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillDecay;
