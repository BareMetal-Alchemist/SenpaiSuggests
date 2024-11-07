import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../signup.module.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [entry, setEntry] = useState('');

  useEffect(() => {
    const entries = [
      "The human known as {username} will meet their fate by {password}.",
      "At exactly noon, {username} will accidentally reveal their secret password '{password}' to an audience of ducks.",
      "{username} will be struck by a runaway shopping cart while yelling '{password}'!",
      "{username} shall vanish mysteriously while attempting to type '{password}' on a vintage typewriter.",
      "During karaoke, {username} will belt out '{password}' and be transported to a parallel universe where everyone speaks in haikus."
    ];
    const entryTemplate = entries[Math.floor(Math.random() * entries.length)];
    setEntry(entryTemplate.replace("{username}", `<input type="text" id="username" placeholder="Username" required />`).replace("{password}", `<input type="text" id="password" placeholder="Password" required />`));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="death-note-rules">
        <h2>Death Note Rules</h2>
        <p>1. The human whose name is written in this note shall die...</p>
        <p>2. This note will not take effect unless the writer has the person's face in mind...</p>
        {/* Add other rules */}
      </div>

      <div className="sign-in-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div dangerouslySetInnerHTML={{ __html: entry }} />
          <button type="submit">Confirm Entry</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
