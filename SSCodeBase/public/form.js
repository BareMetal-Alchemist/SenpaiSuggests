document.getElementById('loginForm').addEventListener('submit', async (event)=> {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occured. Please try again.');
    }
});

document.getElementById('signupForm').addEventListener('submit', async (event)=>{
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try{
        const response = await fetch('http://localhost:3002/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        });

        const result = await response.json();

        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});