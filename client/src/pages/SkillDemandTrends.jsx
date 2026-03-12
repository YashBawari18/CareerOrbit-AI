import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import PageHeader from '../components/PageHeader';
import './SkillDemandTrends.css';

const SkillDemandTrends = () => {
    const trendingSkills = [
        { skill: 'AI/ML', growth: '+145%', demand: 95, trend: 'up' },
        { skill: 'Cloud Architecture', growth: '+98%', demand: 90, trend: 'up' },
        { skill: 'Cybersecurity', growth: '+87%', demand: 88, trend: 'up' },
        { skill: 'DevOps', growth: '+76%', demand: 85, trend: 'up' },
        { skill: 'Data Science', growth: '+65%', demand: 82, trend: 'up' }
    ];

    const decliningSkills = [
        { skill: 'jQuery', growth: '-45%', demand: 35, trend: 'down' },
        { skill: 'PHP (Legacy)', growth: '-32%', demand: 40, trend: 'down' },
        { skill: 'Flash', growth: '-89%', demand: 5, trend: 'down' }
    ];

    const yourSkills = [
        { skill: 'JavaScript', marketDemand: 92, yourLevel: 75, status: 'strong' },
        { skill: 'React', marketDemand: 88, yourLevel: 80, status: 'strong' },
        { skill: 'Node.js', marketDemand: 85, yourLevel: 65, status: 'moderate' },
        { skill: 'Python', marketDemand: 90, yourLevel: 50, status: 'opportunity' }
    ];

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="trends-page">
                <PageHeader
                    title="Market Demand Trends"
                    subtitle="Real-time intelligence on the evolving professional landscape."
                    badge="Market Intelligence"
                />

                <section className="trends-content section-padding">
                    <div className="container">

                        <div className="stats-grid mb-8">
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

                        <div className="trending-section mb-8">
                            <h2 className="mb-6">Rising Professional Standards</h2>
                            <div className="skills-trend-grid">
                                {trendingSkills.map((item, index) => (
                                    <div key={item.skill} className="trend-card-ui glass-card p-6 rising">
                                        <div className="tc-header mb-4">
                                            <h3>{item.skill}</h3>
                                            <div className="growth-pill positive">+{item.growth}</div>
                                        </div>
                                        <div className="demand-bar-container mb-2">
                                            <div className="demand-fill" style={{ width: `${item.demand}%` }}></div>
                                        </div>
                                        <div className="demand-meta">
                                            <span>Market Penetration</span>
                                            <strong>{item.demand}%</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="comparison-section glass-card p-8 mb-8">
                            <h2 className="mb-6">Your Market Positioning</h2>
                            <div className="market-comparison-grid grid-2">
                                {yourSkills.map(item => (
                                    <div key={item.skill} className={`comparison-item-ui ${item.status} p-4 rounded`}>
                                        <div className="ci-header mb-4">
                                            <h3>{item.skill}</h3>
                                            <div className={`ci-badge ${item.status}`}>
                                                {item.status === 'strong' && 'Optimal'}
                                                {item.status === 'moderate' && 'Developing'}
                                                {item.status === 'opportunity' && 'High Reward'}
                                            </div>
                                        </div>
                                        <div className="ci-bars">
                                            <div className="ci-bar-row mb-2">
                                                <div className="ci-bar-info">Market Demand <strong>{item.marketDemand}%</strong></div>
                                                <div className="ci-bar"><div className="ci-fill market" style={{ width: `${item.marketDemand}%` }}></div></div>
                                            </div>
                                            <div className="ci-bar-row">
                                                <div className="ci-bar-info">Your Proficiency <strong>{item.yourLevel}%</strong></div>
                                                <div className="ci-bar"><div className="ci-fill personal" style={{ width: `${item.yourLevel}%` }}></div></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-actions text-center mt-8">
                            <Link to="/dashboard/decay" className="btn btn-outline btn-lg">Analyze Skill Decay Velocity →</Link>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillDemandTrends;
