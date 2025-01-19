import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Pokedex from './pages/Pokedex';
import CreateTeam from './pages/CreateTeam';
import MyTeams from './pages/MyTeams';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const AppContent = () => {
    const location = useLocation();
    const hideNavbarRoutes = ['/auth'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    return (
      <div className="app-container">
        {!shouldHideNavbar && <Navbar isLoggedIn={isAuthenticated} onLogout={handleLogout} />}
        <div className="content-container">
          <Routes>
            <Route
              path="/auth"
              element={isAuthenticated ? <Navigate to="/home" replace /> : <AuthPage onLogin={handleLogin} />}
            />
            <Route
              path="/home"
              element={isAuthenticated ? <Home /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/pokedex"
              element={isAuthenticated ? <Pokedex /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/createteam"
              element={isAuthenticated ? <CreateTeam /> : <Navigate to="/auth" replace />}
            />
            <Route
              path="/myteams"
              element={isAuthenticated ? <MyTeams /> : <Navigate to="/auth" replace />}
            />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
