async function fetchData() {
    try {
      const response = await fetch('http://localhost:3000/api/data'); // API endpoint on your server
      const data = await response.json();

      // Display data in the HTML
      const dataContainer = document.getElementById('data');
      data.forEach(row => {
        const rowElement = document.createElement('p');
        rowElement.textContent = JSON.stringify(row);
        dataContainer.appendChild(rowElement);
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  fetchData();