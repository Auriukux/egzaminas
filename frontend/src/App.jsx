import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Admin from './pages/Admin';
import Public from './pages/Public';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'user');

  const handleLogin = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole('user');
  };

  return (
    <div className="container mt-4">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? (
              <Admin onLogout={handleLogout} role={userRole} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Public />} />
      </Routes>
    </div>
  );
}

export default App;
