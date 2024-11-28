import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

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
    console.log(localStorage.getItem('user'));
    onLogout();
    navigate('/auth');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        {isLoggedIn ? (
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
            <li>
              <span>Hello, {username}!</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
