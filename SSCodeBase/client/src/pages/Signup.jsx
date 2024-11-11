import React, { useState, useEffect } from 'react';
import styles from './signup.module.css';

const SignUp = () => {
  const [entryText, setEntryText] = useState('');

  useEffect(() => {
    updateEntryTemplate();
  }, []);

  const updateEntryTemplate = () => {
    const entries = [
      "The human known as {username} will meet their fate by {password}.",
      "At exactly noon, {username} will accidentally reveal their secret password '{password}' to an audience of ducks.",
      "{username} will be struck by a runaway shopping cart while yelling '{password}'!",
      "{username} shall vanish mysteriously while attempting to type '{password}' on a vintage typewriter.",
      "During karaoke, {username} will belt out '{password}' and be transported to a parallel universe where everyone speaks in haikus."
    ];
    const randomEntry = entries[Math.floor(Math.random() * entries.length)];
    const formattedEntry = randomEntry
      .replace('{username}', `<input type="text" class="${styles.input}" placeholder="Username" required />`)
      .replace('{password}', `<input type="text" class="${styles.input}" placeholder="Password" required />`);
    setEntryText(formattedEntry);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

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
          <p
            id="entry"
            className={styles.entry}
            dangerouslySetInnerHTML={{ __html: entryText }}
          />
          <button type="submit" className={styles.button}>Confirm Entry</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;