// src/components/LoginForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSigninButton from './GoogleAuth';
import './loginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        // Navigate to the main menu on successful login
        navigate('/mainmenu');

      } else {
        // Display error message from the server
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit} id="loginForm">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button className="btn" type="submit">Login</button>
        <button className="btn" type="button" onClick={() => navigate('/register')}>
          Sign Up
        </button>
        <GoogleSigninButton />

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
