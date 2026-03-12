const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const User = require("../models/UserPG");

// ─── Skill Matching Logic ───────────────────────────────────────────────
/**
 * Compare user skills with job-extracted skills.
 * Returns a match percentage (0-100).
 *
 * extractedSkills = skills we parsed from the job title/description
 * userSkills      = flat array of the user's skill strings (lowercased)
 */
const calculateMatchScore = (extractedSkills, userSkills) => {
    if (!extractedSkills || extractedSkills.length === 0) return 0;
    const userLower = userSkills.map((s) => s.toLowerCase().trim());
    const matched = extractedSkills.filter((s) =>
        userLower.includes(s.toLowerCase().trim())
    );
    return Math.round((matched.length / extractedSkills.length) * 100);
};

// ─── Skill Extraction Helpers ───────────────────────────────────────────
/**
 * Master list of recognisable skills.
 * Kept broad so we can match keywords inside job titles & descriptions.
 */
const KNOWN_SKILLS = [
    // Programming Languages
    "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Ruby", "Go",
    "Rust", "PHP", "Swift", "Kotlin", "Scala", "R", "MATLAB", "Perl", "Dart",
    // Frontend
    "React", "Angular", "Vue", "Vue.js", "Next.js", "Svelte", "HTML", "CSS",
    "SASS", "SCSS", "Tailwind", "Bootstrap", "jQuery", "Redux", "Webpack",
    // Backend
    "Node.js", "Express", "Express.js", "Django", "Flask", "Spring Boot",
    "FastAPI", "NestJS", "Ruby on Rails", "ASP.NET", ".NET",
    // Databases
    "MongoDB", "PostgreSQL", "MySQL", "SQL", "Redis", "Elasticsearch",
    "Firebase", "DynamoDB", "Cassandra", "SQLite", "Oracle",
    // Cloud & DevOps
    "AWS", "Azure", "GCP", "Google Cloud", "Docker", "Kubernetes",
    "Jenkins", "CI/CD", "Terraform", "Ansible", "Linux", "Nginx",
    // Data & AI/ML
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision",
    "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn",
    "Data Science", "Data Analysis", "Data Engineering", "Spark",
    "Hadoop", "Tableau", "Power BI",
    // Mobile
    "React Native", "Flutter", "iOS", "Android", "SwiftUI",
    // Tools & Practices
    "Git", "GitHub", "REST APIs", "GraphQL", "Microservices",
    "Agile", "Scrum", "Jira", "Figma", "Postman",
    // Other
    "Blockchain", "Web3", "Solidity", "Cybersecurity", "DevOps",
    "System Design", "API Design", "Testing", "Unit Testing"
];

/**
 * Extract recognisable skills from free-text (title + description).
 * Returns an array of skill strings that appear in the text.
 */
const extractSkillsFromText = (text) => {
    if (!text) return [];
    const lowerText = text.toLowerCase();
    return KNOWN_SKILLS.filter((skill) =>
        lowerText.includes(skill.toLowerCase())
    );
};

// ─── Experience-level classifier ────────────────────────────────────────
const classifyExperience = (title = "", description = "") => {
    const combined = `${title} ${description}`.toLowerCase();
    if (
        combined.includes("senior") ||
        combined.includes("lead") ||
        combined.includes("principal") ||
        combined.includes("staff") ||
        combined.includes("architect")
    )
        return "Senior";
    if (
        combined.includes("junior") ||
        combined.includes("associate") ||
        combined.includes("jr.")
    )
        return "Junior";
    if (
        combined.includes("intern") ||
        combined.includes("entry") ||
        combined.includes("trainee") ||
        combined.includes("fresher") ||
        combined.includes("graduate")
    )
        return "Entry-Level";
    return "Mid-Level";
};

// ─── Job-type classifier ────────────────────────────────────────────────
const classifyJobType = (title = "", description = "", extras = {}) => {
    const combined =
        `${title} ${description} ${extras.jobType || ""}`.toLowerCase();
    if (combined.includes("remote") || combined.includes("work from home"))
        return "Remote";
    if (combined.includes("hybrid")) return "Hybrid";
    return "On-site";
};

// ─── Normalise JSearch results ──────────────────────────────────────────
const normaliseJSearchJob = (job, userSkillsLower) => {
    const rawTitle = job.job_title || "Untitled";
    const rawDesc =
        job.job_description || job.job_highlights?.Qualifications?.join(" ") || "";
    const extractedSkills = extractSkillsFromText(`${rawTitle} ${rawDesc}`);

    // Determine location string
    let location = "Remote";
    if (job.job_city && job.job_country) {
        location = `${job.job_city}, ${job.job_country}`;
    } else if (job.job_country) {
        location = job.job_country;
    }

    return {
        id: job.job_id || `jsearch-${Date.now()}-${Math.random()}`,
        title: rawTitle,
        company: job.employer_name || "Company",
        location,
        salary: job.job_min_salary && job.job_max_salary
            ? `₹${Math.round(job.job_min_salary / 100000)}L – ₹${Math.round(job.job_max_salary / 100000)}L`
            : "Not Disclosed",
        jobType: classifyJobType(rawTitle, rawDesc, {
            jobType: job.job_employment_type,
        }),
        experience: classifyExperience(rawTitle, rawDesc),
        requiredSkills: extractedSkills.length > 0 ? extractedSkills : ["General"],
        description:
            rawDesc.length > 200 ? rawDesc.substring(0, 200) + "…" : rawDesc || "No description available.",
        applyUrl: job.job_apply_link || job.job_google_link || "#",
        matchScore: 0, // will be computed below
    };
};

// ─── Normalise Adzuna results ───────────────────────────────────────────
const normaliseAdzunaJob = (job, userSkillsLower) => {
    const rawTitle = job.title || "Untitled";
    const rawDesc = job.description || "";
    const extractedSkills = extractSkillsFromText(`${rawTitle} ${rawDesc}`);

    return {
        id: job.id || `adzuna-${Date.now()}-${Math.random()}`,
        title: rawTitle,
        company: job.company?.display_name || "Company",
        location: job.location?.display_name || "India",
        salary:
            job.salary_min && job.salary_max
                ? `₹${Math.round(job.salary_min / 100000)}L – ₹${Math.round(job.salary_max / 100000)}L`
                : "Not Disclosed",
        jobType: classifyJobType(rawTitle, rawDesc),
        experience: classifyExperience(rawTitle, rawDesc),
        requiredSkills: extractedSkills.length > 0 ? extractedSkills : ["General"],
        description:
            rawDesc.length > 200 ? rawDesc.substring(0, 200) + "…" : rawDesc || "No description available.",
        applyUrl: job.redirect_url || "#",
        matchScore: 0,
    };
};

// ─── API Fetchers ───────────────────────────────────────────────────────

/**
 * Fetch jobs from JSearch (RapidAPI).
 * Env vars: JSEARCH_API_KEY
 */
const fetchJSearchJobs = async (skills) => {
    const apiKey = process.env.JSEARCH_API_KEY;
    if (!apiKey) {
        console.log("⚠️ JSEARCH_API_KEY not set – skipping JSearch");
        return [];
    }

    // Build query from user skills (top 5 to keep it focused)
    const query = skills.slice(0, 5).join(" OR ") + " developer India";

    try {
        const response = await axios.get(
            "https://jsearch.p.rapidapi.com/search",
            {
                params: {
                    query,
                    page: "1",
                    num_pages: "1",
                    date_posted: "month",
                },
                headers: {
                    "X-RapidAPI-Key": apiKey,
                    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
                },
                timeout: 10000,
            }
        );
        return response.data?.data || [];
    } catch (err) {
        console.error("JSearch API error:", err.message);
        return [];
    }
};

/**
 * Fetch jobs from Adzuna.
 * Env vars: ADZUNA_APP_ID, ADZUNA_APP_KEY
 */
const fetchAdzunaJobs = async (skills) => {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;
    if (!appId || !appKey) {
        console.log("⚠️ Adzuna credentials not set – skipping Adzuna");
        return [];
    }

    const query = skills.slice(0, 5).join(" ");

    try {
        const response = await axios.get(
            `https://api.adzuna.com/v1/api/jobs/in/search/1`,
            {
                params: {
                    app_id: appId,
                    app_key: appKey,
                    results_per_page: 20,
                    what: query,
                    content_type: "application/json",
                },
                timeout: 10000,
            }
        );
        return response.data?.results || [];
    } catch (err) {
        console.error("Adzuna API error:", err.message);
        return [];
    }
};

// ─── Fallback / Demo data ───────────────────────────────────────────────
const generateFallbackJobs = (userSkills) => {
    // If both APIs fail / are unconfigured, return curated demo jobs
    // so the UI is never empty during development.
    const demoJobs = [
        {
            id: "demo-1",
            title: "Frontend Developer",
            company: "Google",
            location: "Bangalore, India",
            salary: "₹12L – ₹25L",
            jobType: "Hybrid",
            experience: "Mid-Level",
            requiredSkills: ["JavaScript", "React", "HTML", "CSS", "TypeScript", "Git"],
            description:
                "Build next-generation user interfaces for Google products, working with a world-class design team.",
            applyUrl: "https://careers.google.com",
        },
        {
            id: "demo-2",
            title: "Full Stack Engineer",
            company: "Microsoft",
            location: "Hyderabad, India",
            salary: "₹15L – ₹30L",
            jobType: "Hybrid",
            experience: "Mid-Level",
            requiredSkills: ["JavaScript", "React", "Node.js", "REST APIs", "SQL", "Azure"],
            description:
                "Design and implement scalable web applications on the Azure cloud platform.",
            applyUrl: "https://careers.microsoft.com",
        },
        {
            id: "demo-3",
            title: "React Developer",
            company: "Flipkart",
            location: "Bangalore, India",
            salary: "₹10L – ₹20L",
            jobType: "On-site",
            experience: "Junior",
            requiredSkills: ["JavaScript", "React", "HTML", "CSS", "Redux", "Git"],
            description:
                "Build high-performance e-commerce experiences serving millions of users daily.",
            applyUrl: "https://www.flipkartcareers.com",
        },
        {
            id: "demo-4",
            title: "Backend Engineer",
            company: "Amazon",
            location: "Pune, India",
            salary: "₹14L – ₹28L",
            jobType: "On-site",
            experience: "Mid-Level",
            requiredSkills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "AWS", "Docker"],
            description:
                "Build reliable, scalable backend services powering Amazon's marketplace infrastructure.",
            applyUrl: "https://www.amazon.jobs",
        },
        {
            id: "demo-5",
            title: "Software Development Engineer",
            company: "Razorpay",
            location: "Bangalore, India",
            salary: "₹12L – ₹22L",
            jobType: "Remote",
            experience: "Mid-Level",
            requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "REST APIs"],
            description:
                "Build payment infrastructure that powers millions of businesses across India.",
            applyUrl: "https://razorpay.com/careers",
        },
        {
            id: "demo-6",
            title: "MERN Stack Developer",
            company: "Infosys",
            location: "Mysore, India",
            salary: "₹6L – ₹14L",
            jobType: "Hybrid",
            experience: "Junior",
            requiredSkills: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "HTML"],
            description:
                "Join a global consulting giant and work on digital transformation projects for Fortune 500 clients.",
            applyUrl: "https://www.infosys.com/careers",
        },
        {
            id: "demo-7",
            title: "Python Full Stack Developer",
            company: "Wipro",
            location: "Hyderabad, India",
            salary: "₹6L – ₹15L",
            jobType: "Hybrid",
            experience: "Junior",
            requiredSkills: ["Python", "Django", "React", "JavaScript", "PostgreSQL", "REST APIs"],
            description:
                "Build modern web applications using Python and React for enterprise clients worldwide.",
            applyUrl: "https://careers.wipro.com",
        },
        {
            id: "demo-8",
            title: "Software Engineer",
            company: "Atlassian",
            location: "Bangalore, India",
            salary: "₹18L – ₹35L",
            jobType: "Remote",
            experience: "Mid-Level",
            requiredSkills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "Git"],
            description:
                "Build collaboration tools used by millions of teams worldwide, including Jira and Confluence.",
            applyUrl: "https://www.atlassian.com/company/careers",
        },
        {
            id: "demo-9",
            title: "Junior Web Developer",
            company: "TCS",
            location: "Mumbai, India",
            salary: "₹4L – ₹8L",
            jobType: "On-site",
            experience: "Entry-Level",
            requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git"],
            description:
                "Start your career building enterprise web applications for global clients.",
            applyUrl: "https://www.tcs.com/careers",
        },
        {
            id: "demo-10",
            title: "DevOps Engineer",
            company: "Zomato",
            location: "Gurugram, India",
            salary: "₹13L – ₹27L",
            jobType: "Remote",
            experience: "Senior",
            requiredSkills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Python"],
            description:
                "Scale infrastructure for one of India's largest food-tech platforms.",
            applyUrl: "https://www.zomato.com/careers",
        },
        {
            id: "demo-11",
            title: "Associate Software Engineer",
            company: "Accenture",
            location: "Chennai, India",
            salary: "₹4L – ₹9L",
            jobType: "Hybrid",
            experience: "Entry-Level",
            requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL"],
            description:
                "Launch your tech career with hands-on experience in digital transformation projects.",
            applyUrl: "https://www.accenture.com/careers",
        },
        {
            id: "demo-12",
            title: "Data Scientist",
            company: "Swiggy",
            location: "Bangalore, India",
            salary: "₹15L – ₹30L",
            jobType: "Hybrid",
            experience: "Mid-Level",
            requiredSkills: ["Python", "Machine Learning", "SQL", "Pandas", "TensorFlow", "Data Analysis"],
            description:
                "Use data to optimize delivery routes, pricing, and customer experience at scale.",
            applyUrl: "https://careers.swiggy.com",
        },
    ];
    return demoJobs;
};

// ─── Main Route ─────────────────────────────────────────────────────────
// GET /api/jobs/recommendations
router.get("/recommendations", auth, async (req, res) => {
    try {
        let userSkills = [];

        // 1. Fetch user skills from DB
        if (req.dbConnected) {
            const user = await User.findByPk(req.user.id);
            if (user && user.skills && Array.isArray(user.skills)) {
                // skills is JSONB – could be flat strings or objects with a `name` key
                userSkills = user.skills.map((s) =>
                    typeof s === "string" ? s : s.name || s.skill || String(s)
                );
            }
        }

        // If user has no skills in DB, fall back to empty → frontend will pass its own
        if (userSkills.length === 0) {
            // Accept skills from query string as a comma-separated fallback
            const qSkills = req.query.skills;
            if (qSkills) {
                userSkills = qSkills.split(",").map((s) => s.trim()).filter(Boolean);
            }
        }

        if (userSkills.length === 0) {
            return res.json({
                jobs: [],
                source: "none",
                message: "No skills found. Please add skills to your profile first.",
            });
        }

        const userSkillsLower = userSkills.map((s) => s.toLowerCase().trim());

        // 2. Try fetching from external APIs (in parallel)
        const [jsearchRaw, adzunaRaw] = await Promise.all([
            fetchJSearchJobs(userSkills),
            fetchAdzunaJobs(userSkills),
        ]);

        let allJobs = [];
        let source = "";

        // Normalise JSearch results
        if (jsearchRaw.length > 0) {
            const jsJobs = jsearchRaw.map((j) =>
                normaliseJSearchJob(j, userSkillsLower)
            );
            allJobs.push(...jsJobs);
            source = "jsearch";
        }

        // Normalise Adzuna results
        if (adzunaRaw.length > 0) {
            const azJobs = adzunaRaw.map((j) =>
                normaliseAdzunaJob(j, userSkillsLower)
            );
            allJobs.push(...azJobs);
            source = source ? `${source}+adzuna` : "adzuna";
        }

        // 3. Fallback to demo data if no API returned results
        if (allJobs.length === 0) {
            allJobs = generateFallbackJobs(userSkills);
            source = "fallback";
        }

        // 4. Calculate match scores
        allJobs = allJobs.map((job) => ({
            ...job,
            matchScore: calculateMatchScore(job.requiredSkills, userSkills),
        }));

        // 5. Filter: only keep jobs with matchScore > 40%
        allJobs = allJobs.filter((job) => job.matchScore > 40);

        // 6. Sort by matchScore descending
        allJobs.sort((a, b) => b.matchScore - a.matchScore);

        return res.json({
            jobs: allJobs,
            source,
            userSkills,
            totalResults: allJobs.length,
        });
    } catch (err) {
        console.error("Jobs recommendation error:", err);
        return res.status(500).json({
            error: "Failed to fetch job recommendations",
            message: err.message,
        });
    }
});

module.exports = router;
