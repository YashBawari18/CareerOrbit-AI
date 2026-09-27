import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProgressBar from '../components/ProgressBar';
import PageHeader from '../components/PageHeader';
import { useSkills } from '../context/SkillsContext';
import './SkillGapAnalysis.css';

const SkillGapAnalysis = () => {
    const { skills: contextSkills, allSkillsList } = useSkills();

    // Load saved user profile
    const savedProfile = localStorage.getItem('careerOrbitProfile');
    const profile = useMemo(() => {
        if (!savedProfile) return null;
        try {
            return JSON.parse(savedProfile);
        } catch (e) {
            console.error('Failed to parse saved profile:', e);
            return null;
        }
    }, [savedProfile]);

    const targetRole = profile?.targetRole?.trim() || 'Senior Software Engineer';
    const yearsExperience = profile?.yearsExperience || '1-3';

    // Compile complete set of user-verified skills and languages
    const userSkillsList = useMemo(() => {
        const profileSkills = profile?.selectedSkills || [];
        const profileLanguages = profile?.selectedLanguages || [];
        const ctxSkills = allSkillsList || [];
        
        return Array.from(
            new Set([...profileSkills, ...profileLanguages, ...ctxSkills])
        ).filter(Boolean);
    }, [profile, allSkillsList]);

    // Benchmark competencies required for standard target roles
    const BENCHMARK_TEMPLATES = {
        'Senior Software Engineer': [
            { skill: 'JavaScript', requiredLevel: 80, category: 'Technical' },
            { skill: 'React', requiredLevel: 85, category: 'Technical' },
            { skill: 'Node.js', requiredLevel: 80, category: 'Technical' },
            { skill: 'System Design', requiredLevel: 85, category: 'Technical' },
            { skill: 'TypeScript', requiredLevel: 75, category: 'Technical' },
            { skill: 'Testing', requiredLevel: 80, category: 'Technical' },
            { skill: 'CI/CD', requiredLevel: 70, category: 'Tools' },
            { skill: 'English', requiredLevel: 80, category: 'Languages' },
            { skill: 'Leadership', requiredLevel: 75, category: 'Soft' },
            { skill: 'Mentoring', requiredLevel: 80, category: 'Soft' }
        ],
        'Data Scientist': [
            { skill: 'Python', requiredLevel: 85, category: 'Technical' },
            { skill: 'SQL', requiredLevel: 80, category: 'Technical' },
            { skill: 'Machine Learning', requiredLevel: 80, category: 'Technical' },
            { skill: 'Statistics', requiredLevel: 85, category: 'Technical' },
            { skill: 'Data Visualization', requiredLevel: 75, category: 'Technical' },
            { skill: 'Big Data', requiredLevel: 70, category: 'Technical' },
            { skill: 'English', requiredLevel: 80, category: 'Languages' },
            { skill: 'Problem Solving', requiredLevel: 80, category: 'Soft' }
        ],
        'Frontend Engineer': [
            { skill: 'React', requiredLevel: 85, category: 'Technical' },
            { skill: 'JavaScript', requiredLevel: 85, category: 'Technical' },
            { skill: 'TypeScript', requiredLevel: 80, category: 'Technical' },
            { skill: 'CSS', requiredLevel: 80, category: 'Technical' },
            { skill: 'Testing', requiredLevel: 75, category: 'Technical' },
            { skill: 'Git', requiredLevel: 80, category: 'Tools' },
            { skill: 'English', requiredLevel: 80, category: 'Languages' },
            { skill: 'UI/UX Design', requiredLevel: 70, category: 'Technical' }
        ]
    };

    // Helper to normalize and check if user has selected a given skill or language
    const checkUserHasSkill = (benchmarkSkill) => {
        const cleanTarget = (benchmarkSkill || '').toLowerCase().replace(/[\.\s\-_]/g, '');
        return userSkillsList.some(item => {
            const cleanItem = (item || '').toLowerCase().replace(/[\.\s\-_]/g, '');
            if (cleanItem === cleanTarget) return true;
            // Aliases
            if (cleanTarget === 'react' && (cleanItem === 'react' || cleanItem === 'reactjs')) return true;
            if (cleanTarget === 'nodejs' && (cleanItem === 'node' || cleanItem === 'nodejs')) return true;
            if (cleanTarget === 'javascript' && (cleanItem === 'js' || cleanItem === 'javascript')) return true;
            if (cleanTarget === 'typescript' && (cleanItem === 'ts' || cleanItem === 'typescript')) return true;
            return false;
        });
    };

    // Calculate level based on experience when selected
    const getProficiencyLevel = (exp) => {
        switch (exp) {
            case '0-1': return 65;
            case '1-3': return 75;
            case '3-5': return 82;
            case '5-10': return 88;
            case '10+': return 92;
            default: return 78;
        }
    };

    const getPriority = (gap) => {
        if (gap >= 45) return 'Critical';
        if (gap >= 25) return 'High';
        if (gap >= 10) return 'Medium';
        return 'Low';
    };

    const getPriorityColor = (priority) => {
        if (priority === 'Critical') return 'danger';
        if (priority === 'High') return 'warning';
        if (priority === 'Medium') return 'blue';
        return 'success';
    };

    const getGapColor = (gap) => {
        if (gap > 40) return 'danger';
        if (gap > 20) return 'warning';
        if (gap > 10) return 'blue';
        return 'success';
    };

    // Build the dynamic skill comparison list
    const skillComparison = useMemo(() => {
        // Find best matching template or default to Senior Software Engineer
        let baseBenchmarks = BENCHMARK_TEMPLATES['Senior Software Engineer'];
        const lowerRole = targetRole.toLowerCase();
        if (lowerRole.includes('data')) {
            baseBenchmarks = BENCHMARK_TEMPLATES['Data Scientist'];
        } else if (lowerRole.includes('frontend')) {
            baseBenchmarks = BENCHMARK_TEMPLATES['Frontend Engineer'];
        }

        const benchmarkMap = new Map();
        baseBenchmarks.forEach(b => benchmarkMap.set(b.skill.toLowerCase(), b));

        // 1. Process benchmark skills
        const comparisonList = baseBenchmarks.map(item => {
            const hasSkill = checkUserHasSkill(item.skill);
            // CRITICAL: If user has NOT selected the skill or language, yourLevel is 0%
            const yourLevel = hasSkill ? getProficiencyLevel(yearsExperience) : 0;
            const gap = Math.max(0, item.requiredLevel - yourLevel);
            const priority = getPriority(gap);

            return {
                skill: item.skill,
                yourLevel,
                requiredLevel: item.requiredLevel,
                gap,
                priority,
                category: item.category,
                selectedByUser: hasSkill
            };
        });

        // 2. Add extra skills/languages user selected that are outside standard benchmarks
        userSkillsList.forEach(userSkill => {
            const lower = userSkill.toLowerCase();
            const alreadyIncluded = comparisonList.some(
                c => c.skill.toLowerCase() === lower || (lower === 'react' && c.skill === 'React')
            );

            if (!alreadyIncluded) {
                const userLevel = getProficiencyLevel(yearsExperience);
                const reqLevel = 75; // Standard benchmark level for bonus verified competencies
                const gap = Math.max(0, reqLevel - userLevel);
                comparisonList.push({
                    skill: userSkill,
                    yourLevel: userLevel,
                    requiredLevel: reqLevel,
                    gap,
                    priority: getPriority(gap),
                    category: 'User Added',
                    selectedByUser: true
                });
            }
        });

        return comparisonList;
    }, [targetRole, yearsExperience, userSkillsList]);

    const criticalGaps = skillComparison.filter(s => s.priority === 'Critical' || s.priority === 'High');
    const averageGap = skillComparison.length > 0 
        ? Math.round(skillComparison.reduce((sum, s) => sum + s.gap, 0) / skillComparison.length)
        : 0;

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="gap-analysis-page">
                <PageHeader
                    title="Skill Gap Analytics"
                    subtitle={`Precision diagnostics for your transition to: ${targetRole}`}
                    badge="Intelligence"
                />

                <section className="gap-content section-padding">
                    <div className="container">

                        {/* Status notification banner */}
                        <div className="glass-card mb-8 p-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderLeft: '4px solid var(--primary-color)' }}>
                            <div>
                                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                                    {userSkillsList.length > 0
                                        ? `🎯 Active Profile: ${userSkillsList.length} verified competencies & languages detected.`
                                        : '⚠️ No skills or languages selected yet in your profile.'}
                                </span>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                    {userSkillsList.length > 0
                                        ? 'Unselected skills reflect 0% proficiency so you can clearly see gaps to bridge.'
                                        : 'All benchmark skills show 0% until you configure your skills and languages.'}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Link to="/profile/create" className="btn btn-outline btn-sm">
                                    Update Profile
                                </Link>
                                <Link to="/profile/edit-skills" className="btn btn-primary btn-sm">
                                    Manage Skills
                                </Link>
                            </div>
                        </div>

                        <div className="gap-stats-grid grid-3 mb-8">
                            <div className="stat-card-ui glass-card">
                                <span className="sc-label">Average Gap</span>
                                <span className="sc-value">{averageGap}%</span>
                                <div className="sc-icon">📊</div>
                            </div>
                            <div className="stat-card-ui glass-card">
                                <span className="sc-label">Critical Sprints</span>
                                <span className="sc-value">{criticalGaps.length}</span>
                                <div className="sc-icon">⚡</div>
                            </div>
                            <div className="stat-card-ui glass-card">
                                <span className="sc-label">Readiness Score</span>
                                <span className="sc-value">{Math.max(0, 100 - averageGap)}%</span>
                                <div className="sc-icon">🎯</div>
                            </div>
                        </div>

                        <div className="comparison-grid">
                            {skillComparison.map(item => (
                                <div key={item.skill} className={`skill-comparison-card glass-card ${item.yourLevel === 0 ? 'unacquired' : ''}`}>
                                    <div className="skill-header mb-4">
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <h3 className="skill-name" style={{ margin: 0 }}>{item.skill}</h3>
                                                {item.selectedByUser ? (
                                                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', background: '#E6F4EA', color: '#1E8E3E', fontWeight: 600 }}>
                                                        ✓ Acquired
                                                    </span>
                                                ) : (
                                                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', background: '#FCE8E6', color: '#D93025', fontWeight: 600 }}>
                                                        Not Acquired (0%)
                                                    </span>
                                                )}
                                            </div>
                                            <span className={`priority-badge ${getPriorityColor(item.priority)}`} style={{ marginTop: '4px', display: 'inline-block' }}>
                                                {item.priority} Priority
                                            </span>
                                        </div>
                                        <div className={`gap-badge ${getGapColor(item.gap)}`}>
                                            {item.gap}% Gap
                                        </div>
                                    </div>

                                    <div className="comparison-bars mb-6">
                                        <div className="bar-row mb-2">
                                            <div className="bar-info">
                                                <span>Your Level</span>
                                                <strong style={{ color: item.yourLevel === 0 ? '#D93025' : 'inherit' }}>
                                                    {item.yourLevel}%
                                                </strong>
                                            </div>
                                            <ProgressBar percentage={item.yourLevel} color={item.yourLevel === 0 ? 'danger' : 'blue'} showLabel={false} height="small" />
                                        </div>
                                        <div className="bar-row">
                                            <div className="bar-info">
                                                <span>Target Level</span>
                                                <strong>{item.requiredLevel}%</strong>
                                            </div>
                                            <ProgressBar percentage={item.requiredLevel} color="success" showLabel={false} height="small" />
                                        </div>
                                    </div>

                                    {item.gap > 0 ? (
                                        <Link to="/learning/courses" className="btn btn-primary full-width">
                                            Bridge This Gap ({item.gap}%) →
                                        </Link>
                                    ) : (
                                        <div className="proficient-tag">✓ Fully Proficient</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="action-section glass-card mt-8 p-8 text-center">
                            <h2 className="mb-4">Ready to close the distance?</h2>
                            <div className="action-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <Link to="/learning/courses" className="btn btn-primary btn-lg">
                                    Browse Curated Courses
                                </Link>
                                <Link to="/learning/duration" className="btn btn-outline btn-lg">
                                    Calculate Study Velocity
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SkillGapAnalysis;

