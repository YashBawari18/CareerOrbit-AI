import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import SkillIntelligenceSystem from '../components/SkillIntelligenceSystem';
import './SkillDemandTrends.css';

const SkillDemandTrends = () => {
    const [activeTab, setActiveTab] = useState('trending');
    const [hoveredSkill, setHoveredSkill] = useState(null);
    const [statsLoaded, setStatsLoaded] = useState(false);

    const trendingSkills = [
        { skill: 'AI/ML', growth: '+145%', demand: 95, trend: 'up', jobs: '2.1M', companies: 4500 },
        { skill: 'Cloud Architecture', growth: '+98%', demand: 90, trend: 'up', jobs: '1.8M', companies: 3800 },
        { skill: 'Cybersecurity', growth: '+87%', demand: 88, trend: 'up', jobs: '1.5M', companies: 4200 },
        { skill: 'DevOps', growth: '+76%', demand: 85, trend: 'up', jobs: '1.3M', companies: 3600 },
        { skill: 'Data Science', growth: '+65%', demand: 82, trend: 'up', jobs: '1.1M', companies: 3400 }
    ];

    const decliningSkills = [
        { skill: 'jQuery', growth: '-45%', demand: 35, trend: 'down', jobs: '12K', companies: 150 },
        { skill: 'PHP (Legacy)', growth: '-32%', demand: 40, trend: 'down', jobs: '45K', companies: 320 },
        { skill: 'Flash', growth: '-89%', demand: 5, trend: 'down', jobs: '1K', companies: 12 }
    ];

    const yourSkills = [
        { skill: 'JavaScript', marketDemand: 92, yourLevel: 75, status: 'strong', gap: 17 },
        { skill: 'React', marketDemand: 88, yourLevel: 80, status: 'strong', gap: 8 },
        { skill: 'Node.js', marketDemand: 85, yourLevel: 65, status: 'moderate', gap: 20 },
        { skill: 'Python', marketDemand: 90, yourLevel: 50, status: 'opportunity', gap: 40 }
    ];

    useEffect(() => {
        const timer = setTimeout(() => setStatsLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const renderSkillsGrid = (skills, type) => (
        <div className={`skills-trend-grid ${type}`}>
            {skills.map((item, index) => (
                <div
                    key={item.skill}
                    className={`trend-card-enhanced glass-card p-6 ${item.trend} ${hoveredSkill === item.skill ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredSkill(item.skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                >
                    <div className="tc-header mb-4">
                        <div>
                            <h3 className="skill-title">{item.skill}</h3>
                            <div className={`skill-trend-icon ${item.trend}`}>{item.trend === 'up' ? '📈' : '📉'}</div>
                        </div>
                        <div className={`growth-pill ${item.trend === 'up' ? 'positive' : 'negative'}`}>
                            {item.growth}
                        </div>
                    </div>

                    <div className="demand-bar-container mb-4">
                        <div className="demand-fill" style={{ width: `${item.demand}%` }}></div>
                    </div>

                    <div className="demand-meta mb-3">
                        <span>Market Demand</span>
                        <strong>{item.demand}%</strong>
                    </div>

                    <div className="skill-metrics">
                        <div className="metric-item">
                            <span className="metric-label">Open Jobs</span>
                            <strong>{item.jobs}</strong>
                        </div>
                        <div className="metric-item">
                            <span className="metric-label">Companies</span>
                            <strong>{item.companies.toLocaleString()}</strong>
                        </div>
                    </div>

                    <button className="skill-action-btn mt-4">
                        {hoveredSkill === item.skill ? 'Explore Jobs' : 'View Details'}
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="trends-page">
                <PageHeader
                    title="Market Demand Trends"
                    subtitle="Real-time intelligence on the evolving professional landscape."
                    badge="Live Market Data"
                />
                <SkillIntelligenceSystem />

                <section className="trends-content section-padding">
                    <div className="container">
                        <div className={`stats-grid mb-8 ${statsLoaded ? 'animate-in' : ''}`}>
                            <StatCard
                                icon="📈"
                                title="Market Growth"
                                value="+78%"
                                subtitle="Aggregate demand"
                                trend={{ direction: 'up', value: '12%' }}
                                color="success"
                            />
                            <StatCard
                                icon="🔥"
                                title="Emergent Skills"
                                value="15"
                                subtitle="High velocity"
                                color="primary"
                            />
                            <StatCard
                                icon="⚠️"
                                title="Legacy Risk"
                                value="8"
                                subtitle="Skills in decay"
                                color="warning"
                            />
                            <StatCard
                                icon="💼"
                                title="Live Openings"
                                value="2.4M"
                                subtitle="Global tech"
                                trend={{ direction: 'up', value: '18%' }}
                                color="blue"
                            />
                        </div>

                        <div className="trends-tabs mb-8">
                            <button
                                className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
                                onClick={() => setActiveTab('trending')}
                            >
                                🚀 Trending Skills
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'declining' ? 'active' : ''}`}
                                onClick={() => setActiveTab('declining')}
                            >
                                📉 Declining Skills
                            </button>
                        </div>

                        {activeTab === 'trending' && renderSkillsGrid(trendingSkills, 'trending')}
                        {activeTab === 'declining' && renderSkillsGrid(decliningSkills, 'declining')}

                        <div className="comparison-section glass-card p-8 mb-8">
                            <div className="section-header mb-6">
                                <h2>Your Market Positioning</h2>
                                <div className="section-badge">Personal Analytics</div>
                            </div>
                            <div className="market-comparison-grid">
                                {yourSkills.map(item => (
                                    <div key={item.skill} className={`comparison-item-enhanced ${item.status} glass-card p-6`}>
                                        <div className="ci-header mb-4">
                                            <h3>{item.skill}</h3>
                                            <div className={`ci-badge ${item.status}`}>
                                                {item.status === 'strong' && 'Optimal'}
                                                {item.status === 'moderate' && 'Developing'}
                                                {item.status === 'opportunity' && 'High Reward'}
                                            </div>
                                        </div>
                                        <div className="ci-bars">
                                            <div className="ci-bar-row mb-3">
                                                <div className="ci-bar-info">
                                                    <span>Market Demand</span>
                                                    <strong>{item.marketDemand}%</strong>
                                                </div>
                                                <div className="ci-bar">
                                                    <div className="ci-fill market" style={{ width: `${item.marketDemand}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="ci-bar-row mb-3">
                                                <div className="ci-bar-info">
                                                    <span>Your Proficiency</span>
                                                    <strong>{item.yourLevel}%</strong>
                                                </div>
                                                <div className="ci-bar">
                                                    <div className="ci-fill personal" style={{ width: `${item.yourLevel}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="skill-gap">
                                                <span>Gap to Close: <strong>{item.gap}%</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-actions text-center mt-12">
                            <Link to="/dashboard/decay" className="btn btn-primary btn-lg mr-4">
                                Analyze Skill Decay →
                            </Link>
                            <Link to="/skills/recommendations" className="btn btn-outline btn-lg">
                                Get Skill Recommendations
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default SkillDemandTrends;
