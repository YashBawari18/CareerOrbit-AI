import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import './LearningDuration.css';

const LearningDuration = () => {
    const [weeklyHours, setWeeklyHours] = useState(10);

    const skillsToLearn = [
        { skill: 'System Design', hours: 60, category: 'Technical' },
        { skill: 'TypeScript', hours: 40, category: 'Technical' },
        { skill: 'Testing', hours: 30, category: 'Technical' },
        { skill: 'CI/CD', hours: 25, category: 'Tools' },
        { skill: 'Mentoring', hours: 20, category: 'Leadership' }
    ];

    const totalHours = skillsToLearn.reduce((sum, s) => sum + s.hours, 0);
    const weeksNeeded = Math.ceil(totalHours / weeklyHours);
    const monthsNeeded = Math.ceil(weeksNeeded / 4);
    const completionDate = new Date();
    completionDate.setDate(completionDate.getDate() + (weeksNeeded * 7));

    const milestones = [
        { percentage: 25, label: 'Quarter Milestone', weeks: Math.ceil(weeksNeeded * 0.25) },
        { percentage: 50, label: 'Core Proficiency', weeks: Math.ceil(weeksNeeded * 0.5) },
        { percentage: 75, label: 'Transition Ready', weeks: Math.ceil(weeksNeeded * 0.75) },
        { percentage: 100, label: 'Peak Mastery', weeks: weeksNeeded }
    ];

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="duration-page">
                <PageHeader
                    title="Study Velocity Engine"
                    subtitle="Quantify your commitment and visualize your path to technological fluency."
                    badge="Time Planning"
                />

                <section className="duration-content section-padding">
                    <div className="container">

                        <div className="calculator-wrapper grid-3 mb-8">
                            <div className="commitment-card glass-card col-span-2 p-8">
                                <h2 className="mb-4">Learning Commitment</h2>
                                <p className="mb-6">Adjust your weekly hours to see how it impact your transition timeline.</p>

                                <div className="slider-box mb-6">
                                    <input
                                        type="range"
                                        id="weeklyHours"
                                        min="5"
                                        max="40"
                                        value={weeklyHours}
                                        onChange={(e) => setWeeklyHours(parseInt(e.target.value))}
                                        className="velocity-slider"
                                    />
                                    <div className="velocity-display mt-4">
                                        <div className="v-value">{weeklyHours}</div>
                                        <div className="v-label">Hours / Week</div>
                                    </div>
                                </div>
                            </div>

                            <div className="summary-result-card glass-card p-8">
                                <div className="res-item mb-4">
                                    <span className="res-label">Target Completion</span>
                                    <span className="res-value highlight">{completionDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                                </div>
                                <div className="res-item">
                                    <span className="res-label">Total Duration</span>
                                    <span className="res-value">{monthsNeeded} Months</span>
                                </div>
                            </div>
                        </div>

                        <div className="breakdown-grid mb-8">
                            <div className="breakdown-header mb-6">
                                <h2>Backlog Breakdown</h2>
                            </div>
                            <div className="grid-3">
                                {skillsToLearn.map(item => {
                                    const itemWeeks = Math.ceil(item.hours / weeklyHours);
                                    return (
                                        <div key={item.skill} className="breakdown-card glass-card p-6">
                                            <div className="b-header mb-4">
                                                <h3>{item.skill}</h3>
                                                <span className="b-tag">{item.category}</span>
                                            </div>
                                            <div className="b-stats mb-4">
                                                <div className="b-stat">
                                                    <span>Effort</span>
                                                    <strong>{item.hours}h</strong>
                                                </div>
                                                <div className="b-stat">
                                                    <span>Duration</span>
                                                    <strong>{itemWeeks}w</strong>
                                                </div>
                                            </div>
                                            <ProgressBar
                                                percentage={(item.hours / weeklyHours / weeksNeeded) * 100}
                                                color="primary"
                                                height="small"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="milestones-section">
                            <h2 className="mb-6">Journey Benchmarks</h2>
                            <div className="milestones-grid">
                                {milestones.map((m, i) => (
                                    <div key={i} className="milestone-ui-card glass-card p-6">
                                        <div className="mu-header mb-4">
                                            <div className="mu-icon">{m.percentage === 100 ? '🏆' : '🎯'}</div>
                                            <div className="mu-text">
                                                <h3>{m.label}</h3>
                                                <p>Week {m.weeks}</p>
                                            </div>
                                        </div>
                                        <ProgressBar percentage={m.percentage} color={m.percentage === 100 ? 'success' : 'primary'} height="small" />
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

export default LearningDuration;
