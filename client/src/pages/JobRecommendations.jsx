import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';
import './JobRecommendations.css';

const API_URL = (
    import.meta.env.VITE_API_URL || "https://careerorbit-ai-2.onrender.com"
).replace(/\/$/, "") + "/api";

const JobRecommendations = () => {
    const { token } = useAuth();

    // ─── State ──────────────────────────────────────────────────────────
    const [userSkills, setUserSkills] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [source, setSource] = useState('');

    const [filters, setFilters] = useState({
        location: 'all',
        jobType: 'all',
        experience: 'all',
        minMatch: 'all'
    });

    // ─── Fetch job recommendations from backend ─────────────────────────
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);

            try {
                const headers = {};
                if (token) {
                    headers['x-auth-token'] = token;
                }

                const res = await axios.get(`${API_URL}/jobs/recommendations`, {
                    headers,
                    timeout: 15000,
                });

                const data = res.data;

                if (data.userSkills && data.userSkills.length > 0) {
                    setUserSkills(data.userSkills);
                }

                if (data.jobs && data.jobs.length > 0) {
                    setJobList(data.jobs);
                } else {
                    setJobList([]);
                }

                setSource(data.source || '');
            } catch (err) {
                console.error('Failed to fetch job recommendations:', err);
                setError('Failed to load job recommendations. Please try again later.');
                setJobList([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [token]);

    // ─── Match helpers (same logic as before) ───────────────────────────
    const getMatchScore = useCallback((requiredSkills) => {
        if (!requiredSkills || requiredSkills.length === 0) return 0;
        const matched = requiredSkills.filter(s => userSkills.includes(s));
        return Math.round((matched.length / requiredSkills.length) * 100);
    }, [userSkills]);

    const getMatchColor = (score) => {
        if (score >= 90) return 'excellent';
        if (score >= 75) return 'good';
        if (score >= 55) return 'moderate';
        return 'low';
    };

    const getJobTypeBadgeClass = (type) => {
        if (type === 'Remote') return 'remote';
        if (type === 'Hybrid') return 'hybrid';
        return 'onsite';
    };

    // ─── Readiness calculation ──────────────────────────────────────────
    const allRequiredSkills = useMemo(() => [...new Set(jobList.flatMap(j => j.requiredSkills || []))], [jobList]);
    const matchedOverallSkills = useMemo(() => allRequiredSkills.filter(s => userSkills.includes(s)), [allRequiredSkills, userSkills]);
    const readinessScore = allRequiredSkills.length > 0
        ? Math.round((matchedOverallSkills.length / allRequiredSkills.length) * 100)
        : 0;

    // ─── Filter + sort ──────────────────────────────────────────────────
    const filteredJobs = useMemo(() => {
        return jobList
            .map(job => ({
                ...job,
                // Use pre-computed matchScore from API, fallback to local computation
                matchScore: job.matchScore || getMatchScore(job.requiredSkills)
            }))
            .filter(job => {
                if (filters.location !== 'all' && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
                if (filters.jobType !== 'all' && job.jobType !== filters.jobType) return false;
                if (filters.experience !== 'all' && job.experience !== filters.experience) return false;
                if (filters.minMatch !== 'all' && job.matchScore < parseInt(filters.minMatch)) return false;
                return true;
            })
            .sort((a, b) => b.matchScore - a.matchScore);
    }, [filters, getMatchScore, jobList]);

    // ─── Unique locations for the filter dropdown ───────────────────────
    const uniqueLocations = useMemo(() => {
        const locs = new Set();
        jobList.forEach(job => {
            if (job.location) {
                // Extract city name (before comma)
                const city = job.location.split(',')[0].trim();
                if (city) locs.add(city);
            }
        });
        return [...locs].sort();
    }, [jobList]);

    const circumference = 2 * Math.PI * 65;
    const dashOffset = circumference - (readinessScore / 100) * circumference;

    const resetFilters = () => {
        setFilters({ location: 'all', jobType: 'all', experience: 'all', minMatch: 'all' });
    };

    // ─── Loading state ──────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="page-wrapper">
                <Navbar />
                <main className="jobs-page">
                    <PageHeader
                        title="AI Placement Hub"
                        subtitle="Smart job recommendations matched to your skills, experience, and career goals."
                        badge="Placement Intelligence"
                    />
                    <section className="jobs-content section-padding">
                        <div className="container">
                            <div className="loading-state glass-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                <div className="loading-spinner" style={{
                                    width: '48px', height: '48px', border: '4px solid rgba(255,110,20,0.2)',
                                    borderTopColor: '#FF6E14', borderRadius: '50%', margin: '0 auto 1.5rem',
                                    animation: 'spin 0.8s linear infinite'
                                }} />
                                <h3 style={{ marginBottom: '0.5rem' }}>Finding your best matches…</h3>
                                <p style={{ color: 'var(--text-muted, #888)' }}>Analyzing skills and scanning job opportunities</p>
                            </div>
                        </div>
                    </section>
                </main>
                <Footer />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="jobs-page">
                <PageHeader
                    title="AI Placement Hub"
                    subtitle="Smart job recommendations matched to your skills, experience, and career goals."
                    badge="Placement Intelligence"
                />

                <section className="jobs-content section-padding">
                    <div className="container">

                        {/* Error state */}
                        {error && (
                            <div className="error-state glass-card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid #ff4444' }}>
                                <p style={{ color: '#ff4444', fontWeight: 600 }}>{error}</p>
                                <button className="btn btn-outline mt-4" onClick={() => window.location.reload()}>
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Placement Readiness Card */}
                        <div className="readiness-hero glass-card">
                            <div className="readiness-ring-container">
                                <svg viewBox="0 0 150 150">
                                    <defs>
                                        <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#FF6E14" />
                                            <stop offset="100%" stopColor="#FF8C42" />
                                        </linearGradient>
                                    </defs>
                                    <circle className="readiness-ring-bg" cx="75" cy="75" r="65" />
                                    <circle
                                        className="readiness-ring-fill"
                                        cx="75" cy="75" r="65"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={dashOffset}
                                    />
                                </svg>
                                <div className="readiness-score-text">
                                    <div className="score-number">{readinessScore}%</div>
                                    <div className="score-label">Ready</div>
                                </div>
                            </div>
                            <div className="readiness-info">
                                <h2>Placement Readiness</h2>
                                <p>
                                    Your skill profile matches <strong>{readinessScore}%</strong> of the overall skills demanded across top companies.
                                    Focus on the missing skills to boost your placement odds.
                                </p>
                                <div className="readiness-stats">
                                    <div className="readiness-stat">
                                        <div className="stat-value">{userSkills.length}</div>
                                        <div className="stat-key">Your Skills</div>
                                    </div>
                                    <div className="readiness-stat">
                                        <div className="stat-value">{matchedOverallSkills.length}</div>
                                        <div className="stat-key">Matched</div>
                                    </div>
                                    <div className="readiness-stat">
                                        <div className="stat-value">{allRequiredSkills.length - matchedOverallSkills.length}</div>
                                        <div className="stat-key">To Learn</div>
                                    </div>
                                    <div className="readiness-stat">
                                        <div className="stat-value">{filteredJobs.length}</div>
                                        <div className="stat-key">Jobs Found</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Layout */}
                        <div className="jobs-layout">

                            {/* Filters */}
                            <aside className="jobs-filters glass-card">
                                <h3>Filters</h3>

                                <div className="filter-group">
                                    <label>Location</label>
                                    <select value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                                        <option value="all">All Locations</option>
                                        {uniqueLocations.map(loc => (
                                            <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Job Type</label>
                                    <select value={filters.jobType} onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}>
                                        <option value="all">All Types</option>
                                        <option value="Remote">Remote</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="On-site">On-site</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Experience</label>
                                    <select value={filters.experience} onChange={(e) => setFilters({ ...filters, experience: e.target.value })}>
                                        <option value="all">All Levels</option>
                                        <option value="Entry-Level">Entry Level</option>
                                        <option value="Junior">Junior</option>
                                        <option value="Mid-Level">Mid-Level</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Min Skill Match</label>
                                    <select value={filters.minMatch} onChange={(e) => setFilters({ ...filters, minMatch: e.target.value })}>
                                        <option value="all">Any Match %</option>
                                        <option value="90">90%+</option>
                                        <option value="75">75%+</option>
                                        <option value="50">50%+</option>
                                    </select>
                                </div>

                                <button className="filter-reset-btn" onClick={resetFilters}>
                                    Reset Filters
                                </button>

                                <div className="cl-cta mt-6 p-4 bg-light rounded text-center">
                                    <p className="small mb-3">Bridge your skill gaps</p>
                                    <Link to="/learning/gap-analysis" className="btn btn-outline full-width">Gap Analysis</Link>
                                </div>
                            </aside>

                            {/* Jobs Grid */}
                            <div className="jobs-grid">
                                {filteredJobs.length === 0 && !error ? (
                                    <div className="no-results glass-card">
                                        <div className="no-results-icon">No results</div>
                                        <h3>No matching opportunities found</h3>
                                        <p className="mt-2">Try adjusting your filters or adding more skills to your profile.</p>
                                        <button className="btn btn-outline mt-4" onClick={resetFilters}>Reset Filters</button>
                                        <Link to="/profile/edit-skills" className="btn btn-primary mt-4" style={{ marginLeft: '0.5rem' }}>
                                            Add More Skills
                                        </Link>
                                    </div>
                                ) : (
                                    filteredJobs.map(job => (
                                        <div key={job.id} className="job-card glass-card">
                                            <div className="job-card-header">
                                                <div className="job-meta">
                                                    <h3 className="job-title">{job.title}</h3>
                                                    <div className="job-company">{job.company}</div>
                                                    <div className="job-location">{job.location}</div>
                                                </div>
                                                <div className={`skill-match-circle ${getMatchColor(job.matchScore)}`}>
                                                    <div className="skill-match-value">{job.matchScore}%</div>
                                                    <div className="skill-match-label">Match</div>
                                                </div>
                                            </div>

                                            <div className="job-badges">
                                                <span className={`job-badge ${getJobTypeBadgeClass(job.jobType)}`}>{job.jobType}</span>
                                                <span className="job-badge experience">{job.experience}</span>
                                                <span className="job-badge salary">{job.salary}</span>
                                            </div>

                                            <p className="mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{job.description}</p>

                                            <div className="job-skills-section">
                                                <h4>Required Skills</h4>
                                                <div className="job-skills-tags">
                                                    {(job.requiredSkills || []).map(skill => (
                                                        <span
                                                            key={skill}
                                                            className={`job-skill-tag ${userSkills.includes(skill) ? 'matched' : 'missing'}`}
                                                        >
                                                            {userSkills.includes(skill) ? '✓' : '⚠'} {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="job-card-footer">
                                                <a
                                                    href={job.applyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                >
                                                    Apply Now
                                                </a>
                                                <Link to="/learning/courses" className="btn btn-outline">
                                                    Learn Skills
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Interview Prep CTA */}
                        <div className="interview-cta glass-card">
                            <h2>Ace Your Placement</h2>
                            <p>Prepare for interviews with these key focus areas based on your target roles.</p>
                            <div className="interview-tips">
                                <div className="tip-card">
                                    <div className="tip-icon">DSA</div>
                                    <h4>Data Structures and Algorithms</h4>
                                    <p>Practice arrays, trees, graphs and dynamic programming on LeetCode.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">SYS</div>
                                    <h4>System Design</h4>
                                    <p>Learn to design scalable systems like URL shorteners, chat apps and e-commerce.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">PRJ</div>
                                    <h4>Project Showcase</h4>
                                    <p>Highlight 2-3 strong projects with clear problem statements and outcomes.</p>
                                </div>
                                <div className="tip-card">
                                    <div className="tip-icon">BEH</div>
                                    <h4>Behavioral Rounds</h4>
                                    <p>Use the STAR method to answer leadership and teamwork questions effectively.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default JobRecommendations;
