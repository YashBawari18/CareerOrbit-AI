import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SkillTag from '../components/SkillTag';
import PageHeader from '../components/PageHeader';
import './EditSkills.css';

const EditSkills = () => {
    const [skills, setSkills] = useState({
        technical: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
        soft: ['Communication', 'Leadership', 'Problem Solving'],
        tools: ['Git', 'Docker', 'VS Code'],
        languages: ['English', 'Spanish']
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('technical');

    const suggestedSkills = {
        technical: ['TypeScript', 'Java', 'C++', 'Ruby', 'Go', 'Rust', 'PHP', 'Swift'],
        soft: ['Teamwork', 'Critical Thinking', 'Creativity', 'Adaptability', 'Time Management'],
        tools: ['Jira', 'Figma', 'Postman', 'AWS', 'Azure', 'Kubernetes'],
        languages: ['French', 'German', 'Mandarin', 'Japanese', 'Portuguese']
    };

    const handleRemoveSkill = (category, skill) => {
        setSkills(prev => ({
            ...prev,
            [category]: prev[category].filter(s => s !== skill)
        }));
    };

    const handleAddSkill = (category, skill) => {
        if (!skills[category].includes(skill)) {
            setSkills(prev => ({
                ...prev,
                [category]: [...prev[category], skill]
            }));
        }
    };

    const handleAddCustomSkill = () => {
        if (searchTerm.trim() && !skills[selectedCategory].includes(searchTerm.trim())) {
            handleAddSkill(selectedCategory, searchTerm.trim());
            setSearchTerm('');
        }
    };

    const categoryConfig = {
        technical: { label: 'Technical Skills', icon: '💻', color: 'technical' },
        soft: { label: 'Soft Skills', icon: '🤝', color: 'soft' },
        tools: { label: 'Tools & Platforms', icon: '🛠️', color: 'tools' },
        languages: { label: 'Languages', icon: '🌍', color: 'languages' }
    };

    const totalSkills = Object.values(skills).reduce((acc, arr) => acc + arr.length, 0);

    return (
        <div className="page-wrapper">
            <Navbar />

            <main className="edit-skills-page">
                <PageHeader
                    title="Manage Your Skills"
                    subtitle="Add, remove, and organize your professional skills with AI-assisted suggestions."
                    badge="Profile Management"
                />

                <section className="skills-management section-padding">
                    <div className="container">

                        <div className="skills-status-card glass-card mb-8">
                            <div className="stat-content">
                                <span className="sc-label">Current Velocity</span>
                                <span className="sc-value">{totalSkills} Skills</span>
                            </div>
                            <div className="stat-icon">⚡</div>
                        </div>

                        {/* Add Skills Section */}
                        <div className="add-skills-card glass-card mb-8">
                            <h2 className="mb-4">Add New Skills</h2>
                            <div className="add-skills-controls">
                                <div className="category-selector mb-4">
                                    {Object.entries(categoryConfig).map(([key, config]) => (
                                        <button
                                            key={key}
                                            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
                                            onClick={() => setSelectedCategory(key)}
                                        >
                                            <span className="category-icon">{config.icon}</span>
                                            <span>{config.label}</span>
                                        </button>
                                    ))}
                                </div>

                                <div className="skill-search">
                                    <input
                                        type="text"
                                        placeholder="Search or add custom skill..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddCustomSkill()}
                                    />
                                    <button className="btn btn-primary" onClick={handleAddCustomSkill}>
                                        Add +
                                    </button>
                                </div>
                            </div>

                            <div className="suggested-skills">
                                <h3 className="mb-2">Recommended for you</h3>
                                <div className="skills-list">
                                    {suggestedSkills[selectedCategory]
                                        .filter(skill => !skills[selectedCategory].includes(skill))
                                        .map(skill => (
                                            <button
                                                key={skill}
                                                className="skill-suggestion"
                                                onClick={() => handleAddSkill(selectedCategory, skill)}
                                            >
                                                {skill} <span className="add-icon">+</span>
                                            </button>
                                        ))}
                                </div>
                            </div>
                        </div>

                        {/* Current Skills Section */}
                        <div className="current-skills-section">
                            <h2 className="mb-6 text-center">Your Skill Portfolio</h2>

                            <div className="grid-3">
                                {Object.entries(categoryConfig).map(([category, config]) => (
                                    <div key={category} className="skill-category-card glass-card">
                                        <div className="category-header mb-4">
                                            <div className="category-title">
                                                <span className="category-icon-large">{config.icon}</span>
                                                <div>
                                                    <h3>{config.label}</h3>
                                                    <p>{skills[category].length} verified skills</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="skills-container">
                                            {skills[category].length > 0 ? (
                                                skills[category].map(skill => (
                                                    <SkillTag
                                                        key={skill}
                                                        skill={skill}
                                                        category={config.color}
                                                        onRemove={() => handleRemoveSkill(category, skill)}
                                                    />
                                                ))
                                            ) : (
                                                <p className="empty-state">No skills added in this category</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="skills-actions mt-8 text-center pt-6">
                            <Link to="/profile/skill-levels" className="btn btn-primary btn-lg">
                                Next: Set Skill Levels →
                            </Link>
                        </div>

                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default EditSkills;
