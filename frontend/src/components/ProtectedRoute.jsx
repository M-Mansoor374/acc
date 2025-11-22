import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem('acceptopia-authenticated') === 'true';

  // If not authenticated, redirect to login/portal page
  if (!isAuthenticated) {
    return <Navigate to="/portal" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;










