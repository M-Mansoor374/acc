import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Check if user is admin
const isAdmin = () => {
  const userRole = sessionStorage.getItem('acceptopia-role');
  const isAuthenticated = sessionStorage.getItem('acceptopia-authenticated') === 'true';
  return isAuthenticated && userRole === 'admin';
};

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const admin = isAdmin();
  const isAuthenticated = sessionStorage.getItem('acceptopia-authenticated') === 'true';

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/portal" replace state={{ from: location }} />;
  }

  // If authenticated but not admin, redirect to user dashboard
  if (!admin) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;




