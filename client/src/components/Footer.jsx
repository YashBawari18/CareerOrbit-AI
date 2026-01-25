import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer section-padding">
            <div className="container footer-content">
                <div className="footer-brand">
                    <h3>CareerOrbit AI</h3>
                    <p>© 2026 CareerOrbit. All rights reserved.</p>
                </div>
                <div className="footer-links">
                    <div className="link-col">
                        <h4>Product</h4>
                        <a href="#">Features</a>
                        <a href="#">Pricing</a>
                    </div>
                    <div className="link-col">
                        <h4>Company</h4>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
