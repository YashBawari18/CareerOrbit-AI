import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const SkillsContext = createContext();

export const useSkills = () => useContext(SkillsContext);

export const SkillsProvider = ({ children }) => {
    const { user } = useAuth();
    const storageKey = user ? `user_skills_${user.id}` : 'guest_skills';

    // Helper to group skills into technical, soft, tools, languages
    const categorizeSkillsList = (skillList, langList = []) => {
        const TOOL_KEYWORDS = ['git', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'jira', 'figma', 'postman', 'linux', 'vscode', 'jenkins'];
        const SOFT_KEYWORDS = ['leadership', 'communication', 'problem solving', 'teamwork', 'collaboration', 'mentoring', 'time management', 'critical thinking', 'creativity'];
        const LANGUAGE_KEYWORDS = ['english', 'spanish', 'french', 'german', 'mandarin', 'hindi', 'arabic', 'japanese', 'korean', 'portuguese', 'russian', 'italian'];

        const technical = [];
        const tools = [];
        const soft = [];
        const languages = [...(langList || [])];

        const all = Array.from(new Set([...(skillList || []), ...(langList || [])]));
        all.forEach(item => {
            const lower = (item || '').toLowerCase().trim();
            if (langList?.includes(item) || LANGUAGE_KEYWORDS.includes(lower)) {
                if (!languages.includes(item)) languages.push(item);
            } else if (TOOL_KEYWORDS.some(t => lower.includes(t))) {
                if (!tools.includes(item)) tools.push(item);
            } else if (SOFT_KEYWORDS.some(s => lower.includes(s))) {
                if (!soft.includes(item)) soft.push(item);
            } else {
                if (!technical.includes(item)) technical.push(item);
            }
        });

        return { technical, soft, tools, languages };
    };

    const [skills, setSkills] = useState(() => {
        // Priority 1: User's explicit careerOrbitProfile
        const savedProfile = localStorage.getItem('careerOrbitProfile');
        if (savedProfile) {
            try {
                const profileObj = JSON.parse(savedProfile);
                if (Array.isArray(profileObj.selectedSkills)) {
                    return categorizeSkillsList(profileObj.selectedSkills, profileObj.selectedLanguages);
                }
            } catch (e) {
                console.error('Failed to parse careerOrbitProfile:', e);
            }
        }

        // Priority 2: Stored skills by user/guest key
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse storageKey skills:', e);
            }
        }

        // Empty default state — only skills selected by user should be counted!
        return {
            technical: [],
            soft: [],
            tools: [],
            languages: []
        };
    });

    // Sync from localStorage if storageKey or profile changes
    useEffect(() => {
        const savedProfile = localStorage.getItem('careerOrbitProfile');
        if (savedProfile) {
            try {
                const profileObj = JSON.parse(savedProfile);
                if (Array.isArray(profileObj.selectedSkills)) {
                    setSkills(categorizeSkillsList(profileObj.selectedSkills, profileObj.selectedLanguages));
                    return;
                }
            } catch (e) {
                console.error('Failed to sync careerOrbitProfile:', e);
            }
        }

        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                setSkills(JSON.parse(saved));
            } catch (e) {
                setSkills({ technical: [], soft: [], tools: [], languages: [] });
            }
        }
    }, [storageKey]);

    // Save to localStorage and careerOrbitProfile whenever skills change
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(skills));
        try {
            const savedProfile = localStorage.getItem('careerOrbitProfile');
            if (savedProfile) {
                const profileObj = JSON.parse(savedProfile);
                profileObj.selectedSkills = Object.values(skills).flat();
                profileObj.selectedLanguages = skills.languages || [];
                localStorage.setItem('careerOrbitProfile', JSON.stringify(profileObj));
            }
        } catch (e) {
            console.error('Failed to update careerOrbitProfile on skills change:', e);
        }
    }, [skills, storageKey]);

    const handleAddSkill = (category, skill) => {
        const trimmed = skill.trim();
        if (!trimmed) return;

        setSkills(prev => {
            const current = prev[category] || [];
            if (!current.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
                return { ...prev, [category]: [...current, trimmed] };
            }
            return prev;
        });
    };

    const handleRemoveSkill = (category, skill) => {
        setSkills(prev => ({
            ...prev,
            [category]: (prev[category] || []).filter(s => s !== skill)
        }));
    };

    const handleBatchSkills = (groupedSkills) => {
        setSkills(prev => {
            const updated = { ...prev };
            Object.entries(groupedSkills).forEach(([category, newSkills]) => {
                if (updated[category]) {
                    const combined = [...updated[category], ...newSkills];
                    const unique = [];
                    const seen = new Set();
                    combined.forEach(s => {
                        const lower = s.toLowerCase().trim();
                        if (!seen.has(lower)) {
                            seen.add(lower);
                            unique.push(s);
                        }
                    });
                    updated[category] = unique;
                }
            });
            return updated;
        });
    };

    // Flatten all skills for pages that just need a list
    const allSkillsList = Object.values(skills).flat();

    return (
        <SkillsContext.Provider value={{ 
            skills, 
            setSkills, 
            allSkillsList, 
            handleAddSkill, 
            handleRemoveSkill,
            handleBatchSkills
        }}>
            {children}
        </SkillsContext.Provider>
    );
};
