// src/components/LoginForm.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';

function LoginForm() {
  const navigate = useNavigate();

  return (
    <div className="loginContainer">
      <form method="POST" id="loginForm" action="#">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" />
        </div>

        <button className="btn" type="submit">Login</button>
        <button
          className="btn"
          type="button"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
