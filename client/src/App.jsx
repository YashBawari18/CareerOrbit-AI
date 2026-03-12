import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Preloader from './components/Preloader';
import './App.css';

import ProblemStatement from './pages/ProblemStatement';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/problem" element={<ProblemStatement />} />
            {/* Placeholder routes for next tasks */}
            <Route path="/profile" element={<Home />} />
            <Route path="/career-path" element={<Home />} />
            <Route path="/learning" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
