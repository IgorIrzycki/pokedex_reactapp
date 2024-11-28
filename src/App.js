import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Pokedex from './pages/Pokedex';
import CreateTeam from './pages/CreateTeam';
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

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isAuthenticated} onLogout={handleLogout} />
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
            {/* Default Redirect */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
        <Footer /> {/* Umieść stopkę na dole */}
      </div>
    </Router>
  );
}

export default App;
