// src/pages/Login.js

import VideoBackground from '../Components/videobackground';
import LoginForm from '../Components/loginForm';
import './loginPage.css';

export default function Login() {
  return (
      <div className="hello">
      <h1 id="title">Senpai Suggests</h1>
        <LoginForm />
        <VideoBackground />
      </div>
  );
}
