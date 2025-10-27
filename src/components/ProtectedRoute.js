import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

<<<<<<< HEAD
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
=======
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, loading, user } = useAuth();
>>>>>>> f5a76c9 (final commit)

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

<<<<<<< HEAD
  return isAuthenticated ? children : <Navigate to="/login" replace />;
=======
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.length > 0) {
    if (!user || !roles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
>>>>>>> f5a76c9 (final commit)
};

export default ProtectedRoute;
