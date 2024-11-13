import React, { useState, useEffect } from 'react';
import styles from './signup.module.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [entryTemplate, setEntryTemplate] = useState('');

  const entries = [
    "The human known as {username} will meet their fate by {password}.",
    "At exactly noon, {username} will accidentally reveal their secret password '{password}' to an audience of ducks.",
    "{username} will be struck by a runaway shopping cart while yelling '{password}'!",
    "{username} shall vanish mysteriously while attempting to type '{password}' on a vintage typewriter.",
    "During karaoke, {username} will belt out '{password}' and be transported to a parallel universe where everyone speaks in haikus."
  ];

  useEffect(() => {
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    setEntryTemplate(randomEntry);
  }, []);

  const renderTextWithInputs = () => {
    const parts = entryTemplate.split(/(\{username\}|\{password\})/);
    return parts.map((part, index) => {
      if (part === '{username}') {
        return (
          <input
            key="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className={styles.input}
            required
          />
        );
      } else if (part === '{password}') {
        return (
          <input
            key="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
            required
          />
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.deathNoteRules}>
        <h2>Death Note Rules</h2>
        <p>1. The human whose name is written in this note shall die...</p>
        <p>2. This note will not take effect unless the writer has the person's face in mind...</p>
        {/* Additional rules can be added here */}
      </div>

      <div className={styles.signInForm}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <p className={styles.entry}>{renderTextWithInputs()}</p>
          <button type="submit" className={styles.button}>Confirm Entry</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
