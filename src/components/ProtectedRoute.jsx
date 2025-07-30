import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/MockAuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // If specific roles are required, check if user has access
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Redirect based on user role
    switch (userRole) {
      case 'patient':
        return <Navigate to="/patient-dashboard" replace />;
      case 'doctor':
        return <Navigate to="/doctor-dashboard" replace />;
      case 'nurse':
        return <Navigate to="/nurse-dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin-dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 