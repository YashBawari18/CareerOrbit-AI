import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

import ProblemStatement from './pages/ProblemStatement';
import HowItWorks from './pages/HowItWorks';

// Profile Pages
import CreateProfile from './pages/CreateProfile';
import EditSkills from './pages/EditSkills';
import SkillLevels from './pages/SkillLevels';

// Career Path Pages
import RoleRecommendations from './pages/RoleRecommendations';
import CareerTimeline from './pages/CareerTimeline';
import SectorTransitions from './pages/SectorTransitions';

// Learning Path Pages
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import RecommendedCourses from './pages/RecommendedCourses';
import LearningDuration from './pages/LearningDuration';

// Dashboard Pages
import SkillDemandTrends from './pages/SkillDemandTrends';
import SkillDecay from './pages/SkillDecay';
import FairnessMetrics from './pages/FairnessMetrics';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds fake load time
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem" element={<ProblemStatement />} />
            <Route path="/how-it-works" element={<HowItWorks />} />

            {/* Profile Routes */}
            <Route path="/profile/create" element={<CreateProfile />} />
            <Route path="/profile/edit-skills" element={<EditSkills />} />
            <Route path="/profile/skill-levels" element={<SkillLevels />} />

            {/* Career Path Routes */}
            <Route path="/career/recommendations" element={<RoleRecommendations />} />
            <Route path="/career/timeline" element={<CareerTimeline />} />
            <Route path="/career/transitions" element={<SectorTransitions />} />

            {/* Learning Path Routes */}
            <Route path="/learning/gap-analysis" element={<SkillGapAnalysis />} />
            <Route path="/learning/courses" element={<RecommendedCourses />} />
            <Route path="/learning/duration" element={<LearningDuration />} />

            {/* Dashboard Routes */}
            <Route path="/dashboard/trends" element={<SkillDemandTrends />} />
            <Route path="/dashboard/decay" element={<SkillDecay />} />
            <Route path="/dashboard/fairness" element={<FairnessMetrics />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
