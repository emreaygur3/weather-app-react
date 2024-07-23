import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WeatherPage from './pages/WeatherPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import ExcelPage from './pages/ExcelPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (credentials) => {
    localStorage.setItem('authenticatedUser', JSON.stringify(credentials));
    setIsAuthenticated(true);
    setCurrentUser(credentials);
    navigate('/weather');
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticatedUser');
    setIsAuthenticated(false);
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <div>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/weather"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <WeatherPage currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/excel"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ExcelPage currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
