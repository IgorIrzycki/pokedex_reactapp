import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', password: '', email: '' });
  const navigate = useNavigate();

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/users/login', {
        userName: loginData.username,
        password: loginData.password,
      });

      localStorage.setItem('user', JSON.stringify(response.data));
      const userData = JSON.parse(localStorage.getItem('user'));
      console.log(userData);
      onLogin();
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid login credentials.');
    }
  };

  const handleRegister = async () => {
    const { username, password, email } = registerData;

    if (!isPasswordValid(password)) {
      alert('Password must be at least 8 characters long, include an uppercase letter, and one special character.');
      return;
    }

    if (!isEmailValid(email)) {
      alert('Invalid email format.');
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/v1/users/register', {
        userName: username,
        password,
        email,
        teamIds: [],
      });
      alert('Registration successful!');
      setRegisterData({ username: '', password: '', email: '' });
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('Registration failed.');
    }
  };

  const isPasswordValid = (password) => /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/.test(password);
  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Login</h2>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => handleInputChange(e, setLoginData)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => handleInputChange(e, setLoginData)}
            />
            <button type="button" className="form-button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>

        <div className="form-container">
          <h2>Register</h2>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) => handleInputChange(e, setRegisterData)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => handleInputChange(e, setRegisterData)}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => handleInputChange(e, setRegisterData)}
            />
            <button type="button" className="form-button" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
