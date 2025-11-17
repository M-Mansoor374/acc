import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { QuizPage } from './pages/QuizPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { FeaturesExplorePage } from './pages/FeaturesExplorePage';
import { ProfilePage } from './pages/ProfilePage';
import { PortalPage } from './pages/PortalPage';
import { SignupPage } from './pages/SignupPage';
import { SimulationPage } from './pages/SimulationPage';
import PropTypes from 'prop-types';
const PrivateRoute = ({ children }) => {
  const isAuthenticated = typeof window !== 'undefined' && sessionStorage.getItem('acceptopia-authenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/portal" replace />;
  }
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/simulation"
          element={
            <PrivateRoute>
              <SimulationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <ResourcesPage />
            </PrivateRoute>
          }
        />
        <Route path="/features" element={<FeaturesExplorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
