import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/MockAuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import FieldNurseDashboard from './pages/FieldNurseDashboard';
import AdminDashboard from './pages/AdminDashboard';
import BookingPages from './pages/BookingPages';
import EmergencyPage from './pages/EmergencyPage';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/patient-dashboard" element={
              <ProtectedRoute allowedRoles={['patient', 'admin']}>
                <PatientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/doctor-dashboard" element={
              <ProtectedRoute allowedRoles={['doctor', 'admin']}>
                <DoctorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/nurse-dashboard" element={
              <ProtectedRoute allowedRoles={['nurse', 'admin']}>
                <FieldNurseDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/booking/*" element={<BookingPages />} />
            <Route path="/emergency" element={<EmergencyPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;