// src/pages/Login.js

import React from 'react';
import VideoBackground from '../Components/videobackground';
import LoginForm from '../Components/loginForm';
import './loginPage.css';

function Login() {
  return (
    <div className="loginPage">
        <LoginForm />
      <VideoBackground />
      
    </div>
  );
}

export default Login;
