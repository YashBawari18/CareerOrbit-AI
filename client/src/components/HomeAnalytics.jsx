import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend
} from 'recharts';

const growthData = [
    { year: '2023', baseline: 40000, optimized: 40000 },
    { year: '2024', baseline: 42000, optimized: 55000 },
    { year: '2025', baseline: 44000, optimized: 75000 },
    { year: '2026', baseline: 46000, optimized: 105000 },
    { year: '2027', baseline: 48000, optimized: 145000 },
];

const skillData = [
    { subject: 'Technical', A: 120, fullMark: 150 },
    { subject: 'Strategic', A: 98, fullMark: 150 },
    { subject: 'Leadership', A: 86, fullMark: 150 },
    { subject: 'Creative', A: 99, fullMark: 150 },
    { subject: 'Analytical', A: 85, fullMark: 150 },
    { subject: 'Social', A: 65, fullMark: 150 },
];

const HomeAnalytics = () => {
    return (
        <div className="home-analytics-dashboard">
            <div className="ha-card glass-card">
                <div className="ha-header">
                    <h4>Accelerated Career Value</h4>
                    <span className="ha-badge">3.2x ROI</span>
                </div>
                <div className="ha-chart-container">
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff6b00" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ff6b00" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(20, 20, 25, 0.95)',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="optimized"
                                stroke="#ff6b00"
                                fillOpacity={1}
                                fill="url(#colorOptimized)"
                                strokeWidth={3}
                                name="With CareerOrbit"
                                animationDuration={2000}
                            />
                            <Area
                                type="monotone"
                                dataKey="baseline"
                                stroke="#ffffff"
                                strokeOpacity={0.3}
                                fill="transparent"
                                strokeDasharray="5 5"
                                name="Standard Path"
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="ha-card glass-card">
                <div className="ha-header">
                    <h4>Holistic Skill Profile</h4>
                    <span className="ha-badge">Balanced</span>
                </div>
                <div className="ha-chart-container">
                    <ResponsiveContainer width="100%" height={220}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                            <PolarGrid stroke="rgba(255,255,255,0.1)" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar
                                name="Current Profile"
                                dataKey="A"
                                stroke="#1a237e"
                                strokeWidth={2}
                                fill="#1a237e"
                                fillOpacity={0.4}
                                animationDuration={1500}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <style>{`
                .home-analytics-dashboard {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                    width: 100%;
                }
                .ha-card {
                    padding: 20px;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .ha-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                }
                .ha-header h4 {
                    margin: 0;
                    font-size: 1rem;
                    color: var(--text-main);
                }
                .ha-badge {
                    font-size: 0.75rem;
                    background: rgba(255, 107, 0, 0.1);
                    color: var(--primary-color);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default HomeAnalytics;
