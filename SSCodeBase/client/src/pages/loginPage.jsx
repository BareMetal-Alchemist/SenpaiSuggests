// src/pages/Login.js

import React from 'react';
import VideoBackground from '../Components/videobackground';
import LoginForm from '../Components/loginForm';
import './loginPage.css';




function Login() {
  return (

      
      <div className="hello">
      <h1 id="title">Senp<span id="highlight">ai</span> Suggests</h1>
        <LoginForm />
        <VideoBackground />
      </div>
    
  );
 
}

export default Login;
