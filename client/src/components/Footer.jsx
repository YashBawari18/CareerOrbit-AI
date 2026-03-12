import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid section-padding">
                    <div className="footer-brand-col">
                        <Link to="/" className="f-logo">
                            CareerOrbit <span className="highlight">AI</span>
                        </Link>
                        <p className="f-desc mt-4">
                            Pioneering the future of professional evolution through deep-learning trajectory modeling.
                        </p>
                        <div className="social-links mt-6">
                            <a href="#" className="s-link">𝕏</a>
                            <a href="#" className="s-link">in</a>
                            <a href="#" className="s-link">gh</a>
                        </div>
                    </div>

                    <div className="footer-nav-col">
                        <h4>Platform</h4>
                        <ul>
                            <li><Link to="/how-it-works">Methodology</Link></li>
                            <li><Link to="/career/recommendations">Pathfinder</Link></li>
                            <li><Link to="/learning/gap-analysis">Intelligence</Link></li>
                            <li><Link to="/dashboard/trends">Market Trends</Link></li>
                        </ul>
                    </div>

                    <div className="footer-nav-col">
                        <h4>Resources</h4>
                        <ul>
                            <li><Link to="/problem">The Thesis</Link></li>
                            <li><Link to="/learning/courses">Academy</Link></li>
                            <li><Link to="/dashboard/fairness">Transparency</Link></li>
                            <li><Link to="/profile/create">Get Started</Link></li>
                        </ul>
                    </div>

                    <div className="footer-nav-col">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Protocol</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Security Audit</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 CareerOrbit AI System. All professional rights reserved.</p>
                    <div className="f-bottom-meta">
                        <span>Latency: 24ms</span>
                        <span>v2.1.0-stable</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
