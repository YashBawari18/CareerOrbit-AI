import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './FairnessMetrics.css';

const FairnessMetrics = () => {
    const overallScore = 78;

    const metrics = [
        {
            category: 'Gender Equity',
            score: 82,
            description: 'Equal opportunity distribution across genders',
            insights: ['Female representation: 45%', 'Pay gap: 8% (industry avg: 15%)', 'Leadership roles: 38%']
        },
        {
            category: 'Geographic Diversity',
            score: 75,
            description: 'Access to opportunities across regions',
            insights: ['Remote opportunities: 65%', 'Global reach: 45 countries', 'Regional balance: Good']
        },
        {
            category: 'Experience Level',
            score: 88,
            description: 'Fair distribution across career stages',
            insights: ['Entry-level: 30%', 'Mid-level: 45%', 'Senior: 25%']
        },
        {
            category: 'Educational Background',
            score: 70,
            description: 'Opportunities for diverse educational paths',
            insights: ['Traditional degree: 60%', 'Bootcamp: 25%', 'Self-taught: 15%']
        }
    ];

    const recommendations = [
        {
            title: 'Increase Accessibility',
            priority: 'High',
            description: 'Expand remote learning options to reach underserved communities',
            impact: '+12% accessibility score'
        },
        {
            title: 'Mentorship Programs',
            priority: 'Medium',
            description: 'Create mentorship opportunities for underrepresented groups',
            impact: '+8% equity score'
        },
        {
            title: 'Skill-Based Hiring',
            priority: 'High',
            description: 'Promote skill-based hiring over credential requirements',
            impact: '+15% opportunity access'
        }
    ];

    const getScoreColor = (score) => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'blue';
        if (score >= 40) return 'warning';
        return 'danger';
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="fairness-page">
                <PageHeader
                    title="Platform Equity Audit"
                    subtitle="Quantifying our commitment to radical transparency and equal opportunity access."
                    badge="Integrity"
                />

                <section className="fairness-content section-padding">
                    <div className="container">

                        <div className="fairness-summary grid-3 mb-8">
                            <div className="fs-main-card glass-card col-span-2 p-8">
                                <div className="fsm-content">
                                    <div className="fsm-text">
                                        <h2 className="mb-4">Systemic Fairness Score</h2>
                                        <p className="mb-0">Our algorithms are continuously audited for demographic bias. We maintain a composite score that measures equitable distribution of career recommendations.</p>
                                    </div>
                                    <div className="fsm-score">
                                        <div className="fsm-value">{overallScore}</div>
                                        <div className="fsm-label">Points</div>
                                    </div>
                                </div>
                            </div>
                            <div className="fs-stat-card glass-card p-8 text-center">
                                <div className="fss-icon">⚖️</div>
                                <h3>Industry Rank</h3>
                                <div className="fss-value">Top 5%</div>
                            </div>
                        </div>

                        <div className="stats-overview grid-4 mb-8">
                            <StatCard icon="👥" title="Audited Paths" value="125K" subtitle="Global trajectories" color="blue" />
                            <StatCard icon="🌍" title="Served Nations" value="45" subtitle="Diverse clusters" color="success" />
                            <StatCard icon="📊" title="Equity Delta" value="+12" subtitle="vs last quarter" trend={{ direction: 'up', value: '5 pts' }} color="primary" />
                            <StatCard icon="🛡️" title="Bias Control" value="Active" subtitle="Continuous monitoring" color="success" />
                        </div>

                        <div className="metrics-grid mb-8">
                            {metrics.map(metric => (
                                <div key={metric.category} className="metric-ui-card glass-card p-6">
                                    <div className="mu-header mb-4">
                                        <h3>{metric.category}</h3>
                                        <div className={`mu-score ${getScoreColor(metric.score)}`}>
                                            {metric.score}/100
                                        </div>
                                    </div>
                                    <p className="mu-desc mb-4 small">{metric.description}</p>
                                    <div className="mb-4">
                                        <ProgressBar percentage={metric.score} color={getScoreColor(metric.score)} showLabel={false} height="medium" />
                                    </div>
                                    <div className="mu-insights">
                                        {metric.insights.map((insight, index) => (
                                            <div key={index} className="mui-item">
                                                <span className="mui-dot"></span>
                                                <span>{insight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="recommendations-ui">
                            <h2 className="mb-6">Integrity Roadmap</h2>
                            <div className="grid-3">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className="rec-ui-card glass-card p-6">
                                        <div className="ru-header mb-4">
                                            <h3>{rec.title}</h3>
                                            <div className={`ru-priority ${rec.priority.toLowerCase()}`}>{rec.priority}</div>
                                        </div>
                                        <p className="ru-desc mb-6">{rec.description}</p>
                                        <div className="ru-impact">
                                            <strong>Target: {rec.impact}</strong>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FairnessMetrics;
