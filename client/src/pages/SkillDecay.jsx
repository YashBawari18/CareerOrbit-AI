<<<<<<< HEAD
import React, { useMemo } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 6731e26 (Redesign: Premium UI, Mobile Responsiveness, Contextual Skill Decay, and Fairness Metrics)
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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
    const [context, setContext] = useState('modern-analytics');

    // Base skill data with context-specific modifiers
    const skillsData = [
        {
            skill: 'SQL',
            lastUsed: '1 week ago',
            baseDecay: 15,
            contexts: {
                'legacy-systems': { rate: 5, halfLife: '10 years', desc: 'Used in stable, long-term infrastructure maintenance.' },
                'modern-analytics': { rate: 45, halfLife: '2 years', desc: 'Rapidly evolving syntax (DuckDB, dbt, Streaming SQL).' },
                'fintech-core': { rate: 10, halfLife: '7 years', desc: 'Critical for ACID compliance on established ledgers.' }
            },
            trendBase: [
                { day: 'Day 0', value: 100 },
                { day: 'Day 30', value: 95 },
                { day: 'Day 60', value: 85 },
                { day: 'Day 90', value: 75 }
            ]
        },
        {
            skill: 'JavaScript',
            lastUsed: '1 week ago',
            baseDecay: 5,
            contexts: {
                'legacy-systems': { rate: 2, halfLife: '15 years', desc: 'ES5/jQuery systems have extremely high stability.' },
                'modern-analytics': { rate: 25, halfLife: '4 years', desc: 'Constantly shifting build tools and framework patterns.' },
                'fintech-core': { rate: 15, halfLife: '6 years', desc: 'Heavy emphasis on security-hardened patterns.' }
            },
            trendBase: [
                { day: 'Day 0', value: 100 },
                { day: 'Day 30', value: 98 },
                { day: 'Day 60', value: 95 },
                { day: 'Day 90', value: 92 }
            ]
        },
        {
            skill: 'React',
            lastUsed: '2 days ago',
            baseDecay: 3,
            contexts: {
                'legacy-systems': { rate: 1, halfLife: '12 years', desc: 'Class-based components still power massive enterprise apps.' },
                'modern-analytics': { rate: 35, halfLife: '3 years', desc: 'Server Components and Next.js evolution cycle is aggressive.' },
                'fintech-core': { rate: 20, halfLife: '5 years', desc: 'Focus on stable state management for transaction UI.' }
            },
            trendBase: [
                { day: 'Day 0', value: 100 },
                { day: 'Day 30', value: 99 },
                { day: 'Day 60', value: 97 },
                { day: 'Day 90', value: 96 }
            ]
        }
    ];

<<<<<<< HEAD
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
=======
    const getStatus = (rate) => {
        if (rate <= 10) return 'healthy';
        if (rate <= 25) return 'warning';
        if (rate <= 40) return 'at-risk';
        return 'critical';
    };
>>>>>>> 6731e26 (Redesign: Premium UI, Mobile Responsiveness, Contextual Skill Decay, and Fairness Metrics)

    const getStatusColor = (status) => {
        if (status === 'healthy') return '#10b981';
        if (status === 'warning') return '#f59e0b';
        if (status === 'at-risk') return '#3b82f6';
        return '#ef4444';
    };

    const getProgressBarColor = (status) => {
        if (status === 'healthy') return 'success';
        if (status === 'warning') return 'warning';
        if (status === 'at-risk') return 'blue';
        return 'danger';
    };

<<<<<<< HEAD
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };
=======
    // Process skills based on selected context
    const skills = skillsData.map(item => {
        const contextData = item.contexts[context];
        const status = getStatus(contextData.rate);

        // Generate trend line based on context rate
        const trend = item.trendBase.map((t, i) => ({
            ...t,
            value: Math.max(0, 100 - (contextData.rate * (i * 0.3)))
        }));

        return {
            skill: item.skill,
            lastUsed: item.lastUsed,
            decayRate: contextData.rate,
            halfLife: contextData.halfLife,
            description: contextData.desc,
            status,
            trend
        };
    });
>>>>>>> 6731e26 (Redesign: Premium UI, Mobile Responsiveness, Contextual Skill Decay, and Fairness Metrics)

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="decay-page">
                <PageHeader
                    title="Contextual Skill Half-Life"
                    subtitle="Visualize how your technical expertise decays differently across specific industries and roles."
                    badge="Market Intelligence"
                    gradient="dark"
                />

                <section className="decay-content section-padding">
                    <div className="container">

<<<<<<< HEAD
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
=======
                        <div className="decay-insight-card p-8 mb-8 animate-in">
                            <h2 className="mb-4">Why Half-Life Matters</h2>
                            <p className="mb-6 text-secondary">
                                Skill decay is not global — it’s <strong>contextual</strong>. A skill may be alive in one sector but obsolete in another.
                                SQL for legacy systems has a slow decay, while SQL for modern high-speed analytics erodes rapidly as new standards emerge.
                                Use the selector below to calibrate your specific operational environment.
                            </p>

                            <div className="context-selector-box pt-6 border-top">
                                <h4 className="mb-3">Select Your Environment</h4>
                                <div className="context-chips">
                                    <button
                                        className={`context-chip ${context === 'modern-analytics' ? 'active' : ''}`}
                                        onClick={() => setContext('modern-analytics')}
                                    >
                                        🚀 Modern Analytics
                                    </button>
                                    <button
                                        className={`context-chip ${context === 'legacy-systems' ? 'active' : ''}`}
                                        onClick={() => setContext('legacy-systems')}
                                    >
                                        🏛️ Legacy Infrastructure
                                    </button>
                                    <button
                                        className={`context-chip ${context === 'fintech-core' ? 'active' : ''}`}
                                        onClick={() => setContext('fintech-core')}
                                    >
                                        🏦 FinTech Core
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="skills-decay-grid">
                            {skills.map((item, index) => (
                                <div
                                    key={item.skill}
                                    className={`decay-card-ui glass-card p-6 animate-in delay-${(index + 1) * 100}`}
                                >
                                    <div className="dc-header">
                                        <div>
                                            <h3>{item.skill}</h3>
                                            <div className={`status-pill ${item.status}`}>
                                                {item.status === 'healthy' && 'Stable Proficiency'}
                                                {item.status === 'warning' && 'Erosion Detected'}
                                                {item.status === 'at-risk' && 'High Decay Risk'}
                                                {item.status === 'critical' && 'Rapid Obsolescence'}
                                            </div>
                                        </div>
                                        <div className="dc-icon">📉</div>
                                    </div>

                                    <div className="dc-context-explanation mt-4 mb-4 small opacity-80">
                                        <p>{item.description}</p>
                                    </div>

                                    <div className="dc-metrics">
                                        <div className="dc-metric">
                                            <span>Contextual Rate</span>
                                            <strong>{item.decayRate}% / Qtr</strong>
                                        </div>
                                        <div className="dc-metric">
                                            <span>Est. Half-Life</span>
                                            <strong>{item.halfLife}</strong>
                                        </div>
                                    </div>

                                    <div className="chart-container">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={item.trend}>
                                                <defs>
                                                    <linearGradient id={`color-${item.skill}-${context}`} x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor={getStatusColor(item.status)} stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor={getStatusColor(item.status)} stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Area
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke={getStatusColor(item.status)}
                                                    fillOpacity={1}
                                                    fill={`url(#color-${item.skill}-${context})`}
                                                    strokeWidth={3}
                                                    isAnimationActive={true}
                                                />
                                                <XAxis dataKey="day" hide />
                                                <YAxis hide domain={[0, 100]} />
                                                <Tooltip
                                                    contentStyle={{
                                                        borderRadius: '12px',
                                                        border: 'none',
                                                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                                                    }}
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="dc-meter mb-6">
                                        <div className="meter-info mb-2">
                                            <span>Context Integrity</span>
                                            <strong>{Math.round(item.trend[3].value)}%</strong>
                                        </div>
                                        <ProgressBar
                                            percentage={item.trend[3].value}
                                            color={getProgressBarColor(item.status)}
                                            showLabel={false}
                                            height="medium"
                                        />
                                    </div>

                                    <Link
                                        to="/learning/courses"
                                        className={`btn full-width ${item.status === 'healthy' ? 'btn-outline' : 'btn-primary'}`}
                                    >
                                        {item.status === 'healthy' ? 'Shield Skill' : 'Emergency Refresh'}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="maintenance-section text-center mt-10 p-12 glass-card animate-in delay-500">
                            <h2 className="mb-4">Maintain Peak Proficiency</h2>
                            <p className="mb-6 opacity-80">
                                Contextual modeling reveals that your skills may be at higher risk than standard benchmarks suggest.
                                Activate our predictive maintenance engine to stay ahead of market shifts.
                            </p>
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={() => alert("Contextual Maintenance Mode activated! We'll monitor sector-specific shifts.")}
                            >
                                Activate Contextual Guard →
                            </button>
                        </div>
>>>>>>> 6731e26 (Redesign: Premium UI, Mobile Responsiveness, Contextual Skill Decay, and Fairness Metrics)

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillDecay;

