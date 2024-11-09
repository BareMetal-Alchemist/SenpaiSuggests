// Array of humorous Death Note entries with placeholders for inputs
const entries = [
    "The human known as {username} will meet their fate by {password}.",
    "At exactly noon, {username} will accidentally reveal their secret password '{password}' to an audience of ducks.",
    "{username} will be struck by a runaway shopping cart while yelling '{password}'!",
    "{username} shall vanish mysteriously while attempting to type '{password}' on a vintage typewriter.",
    "During karaoke, {username} will belt out '{password}' and be transported to a parallel universe where everyone speaks in haikus."
  ];
  
  // Function to pick a random entry and insert the input fields
  function updateEntryTemplate() {
    const entryTemplate = entries[Math.floor(Math.random() * entries.length)];
    const entryContainer = document.getElementById("entry");
  
    // Replace placeholders with input elements for the user to fill in
    entryContainer.innerHTML = entryTemplate
      .replace("{username}", `<input type="text" id="username" placeholder="Username" required>`)
      .replace("{password}", `<input type="text" id="password" placeholder="Password" required>`);
  }
  
  // Initialize with a random entry on page load
  document.addEventListener("DOMContentLoaded", () => {
    updateEntryTemplate();
  });