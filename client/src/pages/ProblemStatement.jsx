import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
    Cell
} from 'recharts';
import './ProblemStatement.css';

// Import images
import img1 from '../assets/problem-1.png';
import img2 from '../assets/problem-2.png';
import img3 from '../assets/problem-3.png';

const skillDecayData = [
    { year: '2020', value: 100 },
    { year: '2021', value: 85 },
    { year: '2022', value: 70 },
    { year: '2023', value: 55 },
    { year: '2024', value: 40 },
    { year: '2025', value: 25 },
];

const skillGapData = [
    { name: 'AI/ML', gap: 85, fill: '#FF6E14' },
    { name: 'Cloud', gap: 65, fill: '#FF8A45' },
    { name: 'Cybersecurity', gap: 75, fill: '#FFA676' },
    { name: 'Data Sci', gap: 60, fill: '#FFC1A7' },
    { name: 'Soft Skills', gap: 40, fill: '#FFDDCF' },
];

const careerComplexityData = [
    { subject: 'Sector Jump', A: 120, B: 110, fullMark: 150 },
    { subject: 'Role Pivot', A: 98, B: 130, fullMark: 150 },
    { subject: 'Skill Re-up', A: 86, B: 130, fullMark: 150 },
    { subject: 'Geo-Shift', A: 99, B: 100, fullMark: 150 },
    { subject: 'Tool Change', A: 85, B: 90, fullMark: 150 },
];

const ProblemStatement = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="problem-page">
                <PageHeader
                    title="Problem Statement"
                    subtitle="Why CareerOrbit AI matters in an age of rapid technological change."
                    badge="The Challenge"
                />

                {/* SECTION 2: Core Problem */}
                <section className="core-problem section-padding">
                    <div className="container core-grid">
                        <motion.div
                            className="core-text"
                            {...fadeIn}
                        >
                            <h2 className="mb-4">The Skill Crisis</h2>
                            <div className="problem-blocks">
                                <div className="p-block">
                                    <div className="p-icon">⚡</div>
                                    <p>Technology and AI are evolving so fast that many skills become outdated quickly.</p>
                                </div>
                                <div className="p-block">
                                    <div className="p-icon">🤷‍♂️</div>
                                    <p>Individuals don’t know which skills to learn, which careers are sustainable, or how to pivot across roles and industries.</p>
                                </div>
                                <div className="p-block">
                                    <div className="p-icon">🏛️</div>
                                    <p>Governments, universities, and companies struggle to see future skill gaps and plan long-term workforce strategies.</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="core-visuals"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="img-float-container">
                                <img src={img1} alt="Confusion" className="float-img img-1" />
                                <img src={img2} alt="Uncertainty" className="float-img img-2" />
                                <img src={img3} alt="Future" className="float-img img-3" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION: Visualizing the Decay */}
                <section className="visual-evidence section-padding">
                    <div className="container">
                        <motion.div className="text-center mb-5" {...fadeIn}>
                            <h2>Visualizing the Disruption</h2>
                            <p className="section-subtitle">Real-world data points to a widening gap between human skills and market needs.</p>
                        </motion.div>

                        <div className="charts-grid">
                            <motion.div className="chart-card" {...fadeIn} transition={{ delay: 0.1 }}>
                                <h3>Skill Obsolescence Rate</h3>
                                <p>Average half-life of technical skills (Years)</p>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={skillDecayData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis dataKey="year" stroke="#4F4F4F" />
                                            <YAxis stroke="#4F4F4F" />
                                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px' }} />
                                            <Line type="monotone" dataKey="value" stroke="#FF6E14" strokeWidth={3} dot={{ fill: '#FF6E14', r: 6 }} activeDot={{ r: 8 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div className="chart-card" {...fadeIn} transition={{ delay: 0.2 }}>
                                <h3>The Global Skill Gap</h3>
                                <p>Estimated shortage by 2030 (%)</p>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={skillGapData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                            <XAxis dataKey="name" stroke="#4F4F4F" />
                                            <YAxis stroke="#4F4F4F" />
                                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px' }} />
                                            <Bar dataKey="gap">
                                                {skillGapData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div className="chart-card wide" {...fadeIn} transition={{ delay: 0.3 }}>
                                <h3>Career Complexity Index</h3>
                                <p>Comparing modern vs. traditional career paths</p>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height={400}>
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={careerComplexityData}>
                                            <PolarGrid stroke="#e0e0e0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4F4F4F', fontSize: 12, fontWeight: 600 }} />
                                            <PolarRadiusAxis stroke="#e0e0e0" />
                                            <Radar name="Modern Path" dataKey="B" stroke="#FF6E14" fill="#FF6E14" fillOpacity={0.4} />
                                            <Radar name="Traditional Path" dataKey="A" stroke="#888" fill="#888" fillOpacity={0.2} />
                                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '12px' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: Problem Breakdown */}
                <section className="problem-breakdown section-padding bg-light">
                    <div className="container">
                        <motion.h2 className="text-center mb-5" {...fadeIn}>Key Challenges</motion.h2>
                        <div className="breakdown-grid">
                            {[
                                { icon: '📉', title: 'Skill Obsolescence', desc: 'Skills lose value as new tools, AI, and workflows appear faster than people can adapt.' },
                                { icon: '🔀', title: 'Non-linear Careers', desc: 'Careers no longer follow a straight ladder. People jump across roles, sectors, and geographies.' },
                                { icon: '🧩', title: 'Skill Mismatch', desc: 'Jobs exist, but people don’t have the right skills at the right time, leading to long-term unemployment.' },
                                { icon: '⚖️', title: 'Inequal Opportunity', desc: 'Demographic and socio-economic groups do not experience disruption equally, increasing inequality.' },
                                { icon: '🔭', title: 'Short-term Planning', desc: 'Education and workforce systems are often reactive and short-term, not built for lifelong learning.' }
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    className="problem-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <div className="pc-icon">{item.icon}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 4: Our Problem Focus */}
                <section className="problem-focus section-padding">
                    <div className="container">
                        <motion.div className="focus-box" {...fadeIn}>
                            <h2 className="mb-4">Our Problem Focus</h2>
                            <ul className="focus-list">
                                <li>Model lifelong learning and employment journeys under continuous technological disruption.</li>
                                <li>Track skill acquisition, decay, and transformation over long time horizons.</li>
                                <li>Predict non-linear career transitions across sectors and roles.</li>
                                <li>Identify systemic drivers of skill mismatch and structural unemployment.</li>
                                <li>Ensure fairness across demographic and socio-economic groups.</li>
                                <li>Support long-term workforce planning and education reform analysis.</li>
                            </ul>
                        </motion.div>
                    </div>
                </section>

                {/* SECTION 5: Transition to Solution */}
                <section className="solution-transition section-padding text-center">
                    <div className="container">
                        <motion.div
                            className="highlight-box"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <p className="transition-text">
                                "CareerOrbit AI exists to turn this uncertainty into clarity — by mapping skills, careers, and learning paths over an entire lifetime."
                            </p>
                            <Link to="/how-it-works" className="btn btn-primary btn-lg mt-4">
                                View Our Solution
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ProblemStatement;
