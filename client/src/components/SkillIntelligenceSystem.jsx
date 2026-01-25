import React from 'react';
import './SkillIntelligenceSystem.css';

const SkillIntelligenceSystem = () => {
    return (
        <section className="intelligence-ops-center mb-16">
            <div className="ops-container glass-card">

                <div className="ops-header">
                    <div className="system-badge">System Status: Active</div>
                    <h2 className="glitch-text">Skill Intelligence Ops Center</h2>
                    <p className="ops-tagline">"Visualizing the heartbeat of the global job market"</p>
                </div>

                {/* THE MAIN PIPELINE */}
                <div className="ops-pipeline">

                    {/* SIGNALS BLOCK */}
                    <div className="ops-block signals-block">
                        <div className="block-label">Skill Demand Signals</div>
                        <div className="signals-terminal">
                            <div className="sig-item"><span></span>Job Market</div>
                            <div className="sig-item"><span></span>Hiring Vel</div>
                            <div className="sig-item active"><span></span>Tech Trends</div>
                            <div className="sig-item"><span></span>Industry Rep</div>
                            <div className="sig-item"><span></span>Open Source</div>
                            <div className="sig-item"><span></span>Geo Data</div>
                        </div>
                        <div className="data-pulse-line"></div>
                    </div>

                    {/* ENGINE BLOCK */}
                    <div className="ops-block engine-block">
                        <div className="engine-visual">
                            <div className="core-scanner"></div>
                            <div className="rotating-rings">
                                <div className="ring r1"></div>
                                <div className="ring r2"></div>
                                <div className="ring r3"></div>
                            </div>
                            <div className="engine-info">
                                <h3>Living AI Engine</h3>
                                <div className="bit-stream">10101101...</div>
                            </div>
                        </div>
                        <div className="engine-modules">
                            <div className="em-item">Demand Score</div>
                            <div className="em-item">Half-Life Mod</div>
                            <div className="em-item">Volatility</div>
                        </div>
                    </div>

                    {/* VISUAL TRUTH BLOCK */}
                    <div className="ops-block visuals-block">
                        <div className="block-label">Visual Intelligence</div>
                        <div className="viz-grid-mini">
                            <div className="viz-card-sm">
                                <div className="v-graph line-graph">
                                    <svg viewBox="0 0 100 40">
                                        <path d="M0,35 Q20,30 40,35 T80,10 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </div>
                                <span>Demand Over Time</span>
                            </div>
                            <div className="viz-card-sm">
                                <div className="v-graph radar-graph">
                                    <div className="radar-oct"></div>
                                </div>
                                <span>Skill Radar</span>
                            </div>
                            <div className="viz-card-sm">
                                <div className="v-graph ring-graph">
                                    <svg viewBox="0 0 40 40">
                                        <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
                                        <circle cx="20" cy="20" r="15" fill="none" stroke="var(--primary-color)" strokeWidth="4" strokeDasharray="60 100" />
                                    </svg>
                                </div>
                                <span>Half-Life</span>
                            </div>
                            <div className="viz-card-sm">
                                <div className="v-graph wave-graph">
                                    <div className="wave-line"></div>
                                </div>
                                <span>Volatility</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MIDDLE TIER: CONTEXT & FORECAST */}
                <div className="ops-middle-tier mt-12">
                    <div className="context-visualizer glass-card">
                        <div className="tier-label">Role & Industry Context</div>
                        <div className="context-viz-content">
                            <div className="role-bubble-viz">
                                <div className="bubble b1" data-label="Engineers"></div>
                                <div className="bubble b2" data-label="Designers"></div>
                                <div className="bubble b3" data-label="Leaders"></div>
                            </div>
                            <div className="cv-details">
                                <h4>Multi-Axis Mapping</h4>
                                <p>Role × Industry × Region</p>
                            </div>
                        </div>
                    </div>

                    <div className="forecast-center glass-card">
                        <div className="tier-label">10-Year Forecast Projection</div>
                        <div className="forecast-graph-large">
                            <svg viewBox="0 0 200 60">
                                <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                                </linearGradient>
                                <path d="M0,50 L20,45 L40,55 L60,40 L80,48 L100,30 L120,35 L140,20 L160,25 L180,10 L200,5 L200,60 L0,60 Z" fill="url(#area-grad)" />
                                <path d="M0,50 L20,45 L40,55 L60,40 L80,48 L100,30 L120,35 L140,20 L160,25 L180,10 L100,5" fill="none" stroke="var(--primary-color)" strokeWidth="2" />
                            </svg>
                            <div className="forecast-markers">
                                <span>2026</span>
                                <span>2031</span>
                                <span>2036</span>
                            </div>
                        </div>
                        <div className="scenario-panel">
                            <button className="sc-btn active">AI Boom</button>
                            <button className="sc-btn">Economic Low</button>
                        </div>
                    </div>
                </div>

                {/* USER IMPACT FLOW */}
                <div className="ops-impact-flow mt-12">
                    <div className="impact-path-line">
                        <div className="impact-node" data-label="Gap Analysis">🧩</div>
                        <div className="impact-node" data-label="Learning ROI">💰</div>
                        <div className="impact-node pulse" data-label="Decay Watch">🚨</div>
                        <div className="impact-node" data-label="Fragility">🛡️</div>
                        <div className="impact-node spotlight" data-label="Immunity">✨</div>
                    </div>
                </div>

                {/* FINAL INTELLIGENCE PANEL */}
                <div className="ops-final-panel mt-12">
                    <div className="grid-2">
                        <div className="intel-box">
                            <strong>Systemic Alerts</strong>
                            <ul>
                                <li>Supply-Demand Divergence Clusters</li>
                                <li>Policy Alignment Directives</li>
                            </ul>
                        </div>
                        <div className="intel-box">
                            <strong>Future Immunity</strong>
                            <div className="immunity-meter-viz">
                                <div className="im-bar" style={{ width: '85%' }}></div>
                            </div>
                            <span className="small">Global Avg: 62% | Your Path: 85%</span>
                        </div>
                    </div>
                    <div className="ops-motto text-center mt-10">
                        <div className="motto-text">WE FUTURE-PROOF PEOPLE.</div>
                        <div className="motto-sub">Beyond jobs. Toward professional immortality.</div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SkillIntelligenceSystem;
