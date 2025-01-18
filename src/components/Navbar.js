import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isNavbarFixed, setNavbarFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 130; // Odległość, po której navbar staje się fixed
      if (window.scrollY > scrollThreshold) {
        setNavbarFixed(true);
      } else {
        setNavbarFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        setUsername(userData.username || 'User');
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/auth');
  };

  return (
    <nav
      style={{
        position: isNavbarFixed ? 'fixed' : 'relative',
        top: isNavbarFixed ? 0 : 'auto',
        width: '100%',
        zIndex: 10,
        color: 'white',
      }}
    >
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/pokedex">Pokedex</Link>
            </li>
            <li>
              <Link to="/createteam">Create Team</Link>
            </li>
            <li>
              <Link to="/myteams">My Teams</Link>
            </li>
          </>
        )}
        <li>
          {isLoggedIn ? (
            <>
              <span>Hello, {username}!</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
