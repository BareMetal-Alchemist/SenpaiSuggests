// src/pages/Login.js

import VideoBackground from '../Components/videobackground';
import LoginForm from '../Components/loginForm';
import './loginPage.css';

export default function Login() {
  return (
    <div className="loginPage">
        <LoginForm />
      <VideoBackground />

    </div>
  );
}
