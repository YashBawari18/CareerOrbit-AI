import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './ProblemStatement.css';

// Import images
import img1 from '../assets/problem-1.png';
import img2 from '../assets/problem-2.png';
import img3 from '../assets/problem-3.png';

const ProblemStatement = () => {
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
                        <div className="core-text">
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
                        </div>
                        <div className="core-visuals">
                            <div className="img-float-container">
                                <img src={img1} alt="Confusion" className="float-img img-1" />
                                <img src={img2} alt="Uncertainty" className="float-img img-2" />
                                <img src={img3} alt="Future" className="float-img img-3" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: Problem Breakdown */}
                <section className="problem-breakdown section-padding bg-light">
                    <div className="container">
                        <h2 className="text-center mb-5">Key Challenges</h2>
                        <div className="breakdown-grid">
                            <div className="problem-card">
                                <div className="pc-icon">📉</div>
                                <h3>Skill Obsolescence</h3>
                                <p>Skills lose value as new tools, AI, and workflows appear faster than people can adapt.</p>
                            </div>

                            <div className="problem-card">
                                <div className="pc-icon">🔀</div>
                                <h3>Non-linear Careers</h3>
                                <p>Careers no longer follow a straight ladder. People jump across roles, sectors, and geographies.</p>
                            </div>

                            <div className="problem-card">
                                <div className="pc-icon">🧩</div>
                                <h3>Skill Mismatch</h3>
                                <p>Jobs exist, but people don’t have the right skills at the right time, leading to long-term unemployment.</p>
                            </div>

                            <div className="problem-card">
                                <div className="pc-icon">⚖️</div>
                                <h3>Inequal Opportunity</h3>
                                <p>Demographic and socio-economic groups do not experience disruption equally, increasing inequality.</p>
                            </div>

                            <div className="problem-card">
                                <div className="pc-icon">🔭</div>
                                <h3>Short-term Planning</h3>
                                <p>Education and workforce systems are often reactive and short-term, not built for lifelong learning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: Our Problem Focus */}
                <section className="problem-focus section-padding">
                    <div className="container">
                        <div className="focus-box">
                            <h2 className="mb-4">Our Problem Focus</h2>
                            <ul className="focus-list">
                                <li>Model lifelong learning and employment journeys under continuous technological disruption.</li>
                                <li>Track skill acquisition, decay, and transformation over long time horizons.</li>
                                <li>Predict non-linear career transitions across sectors and roles.</li>
                                <li>Identify systemic drivers of skill mismatch and structural unemployment.</li>
                                <li>Ensure fairness across demographic and socio-economic groups.</li>
                                <li>Support long-term workforce planning and education reform analysis.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* SECTION 5: Transition to Solution */}
                <section className="solution-transition section-padding text-center">
                    <div className="container">
                        <div className="highlight-box">
                            <p className="transition-text">
                                "CareerOrbit AI exists to turn this uncertainty into clarity — by mapping skills, careers, and learning paths over an entire lifetime."
                            </p>
                            <Link to="/how-it-works" className="btn btn-primary btn-lg mt-4">
                                View Our Solution
                            </Link>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ProblemStatement;
