import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
} from 'recharts';
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

    const proficiencyTrendData = [
        { month: 'Jul', score: 92 },
        { month: 'Aug', score: 88 },
        { month: 'Sep', score: 90 },
        { month: 'Oct', score: 82 },
        { month: 'Nov', score: 78 },
        { month: 'Dec', score: 75 },
    ];

    const radarData = useMemo(() => {
        return skills.map(s => ({
            subject: s.skill,
            A: 100 - s.decayRate,
            fullMark: 100,
        }));
    }, [skills]);

    const getStatusColor = (status) => {
        if (status === 'healthy') return 'success';
        if (status === 'warning') return 'warning';
        if (status === 'at-risk') return 'blue';
        return 'danger';
    };

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
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

                        {/* Analytics Section */}
                        <div className="analytics-dashboard grid-2 mb-12">
                            <motion.div className="chart-card-premium glass-card" {...fadeIn}>
                                <div className="chart-header">
                                    <h3>Aggregate Proficiency Trend</h3>
                                    <p>Your overall knowledge retention over the last 6 months</p>
                                </div>
                                <div className="chart-container-ui" style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={proficiencyTrendData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                                            <XAxis dataKey="month" stroke="#4F4F4F" axisLine={false} tickLine={false} dy={10} />
                                            <YAxis hide domain={[0, 100]} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px' }}
                                                itemStyle={{ color: '#FF6E14' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#FF6E14"
                                                strokeWidth={4}
                                                dot={{ fill: '#FF6E14', r: 6, strokeWidth: 2, stroke: '#fff' }}
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div className="chart-card-premium glass-card" {...fadeIn} transition={{ delay: 0.2 }}>
                                <div className="chart-header">
                                    <h3>Knowledge Integrity Matrix</h3>
                                    <p>Relative health across your core competencies</p>
                                </div>
                                <div className="chart-container-ui" style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                            <PolarGrid stroke="#e0e0e0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4F4F4F', fontSize: 12, fontWeight: 600 }} />
                                            <Radar
                                                name="Integrity"
                                                dataKey="A"
                                                stroke="#FF6E14"
                                                fill="#FF6E14"
                                                fillOpacity={0.4}
                                            />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px' }}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div className="decay-insight-card glass-card p-8 mb-12" {...fadeIn}>
                            <h2 className="mb-4">Calculated Half-Life</h2>
                            <p className="mb-0">
                                Skills degrade exponentially without active application. Our engine monitors your usage patterns
                                to predict when your proficiency will drop below market standards.
                                <strong> Prevention is more efficient than relearning.</strong>
                            </p>
                        </motion.div>

                        <div className="grid-3 mb-16">
                            <AnimatePresence>
                                {skills.map((item, idx) => (
                                    <motion.div
                                        key={item.skill}
                                        className={`decay-card-ui glass-card ${item.status}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="dc-header mb-6">
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

                                        <div className="dc-recommendation p-4 rounded mb-6">
                                            <p className="mb-0 small">💡 {item.recommendation}</p>
                                        </div>

                                        <div className="mt-auto">
                                            {item.status !== 'healthy' ? (
                                                <Link to="/learning/courses" className="btn btn-primary full-width">Refresh Skill Path →</Link>
                                            ) : (
                                                <Link to="/profile/edit-skills" className="btn btn-outline full-width">Update Skill Usage</Link>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <motion.div className="maintenance-section text-center p-12 glass-card" {...fadeIn}>
                            <h2 className="mb-4">Maintain Peak Proficiency</h2>
                            <p className="mb-8">Set up intelligent reminders to revisit core concepts before they fade.</p>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => alert('Maintenance Mode Activated! You will receive periodic reminders for your at-risk skills.')}
                            >
                                Activate Maintenance Mode
                            </button>
                        </motion.div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillDecay;
