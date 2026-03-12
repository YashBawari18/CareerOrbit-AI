import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import ScrollToTop from './components/ScrollToTop';
import Chatbot from './components/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
import CareerSimulator from './pages/CareerSimulator';

// Learning Path Pages
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import RecommendedCourses from './pages/RecommendedCourses';
import LearningDuration from './pages/LearningDuration';

// Dashboard Pages
import SkillDemandTrends from './pages/SkillDemandTrends';
import SkillDecay from './pages/SkillDecay';
import FairnessMetrics from './pages/FairnessMetrics';

import UnderConstruction from './pages/UnderConstruction';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) return <Preloader />;
  if (!token) return <Navigate to="/login" />;

  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds fake load time
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          {loading ? (
            <Preloader />
          ) : (
        <Router>
          <ScrollToTop />
          <Chatbot />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/problem" element={<ProblemStatement />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/solution" element={<HowItWorks />} />

            {/* Profile Routes - Construction Mode */}
            <Route path="/profile/*" element={<UnderConstruction />} />

            {/* Career Path Routes - Construction Mode */}
            <Route path="/career/*" element={<UnderConstruction />} />

            {/* Learning Path Routes - Construction Mode */}
            <Route path="/learning/*" element={<UnderConstruction />} />

            {/* Dashboard Routes - Construction Mode */}
            <Route path="/dashboard/*" element={<UnderConstruction />} />
          </Routes>
        </Router>
      )}
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
