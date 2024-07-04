async function fetchLocations() {
    try {
        const response = await fetch('http://localhost:3000/api/locations');
        const data = await response.json();
        displayLocations(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function searchLocation() {
    const name = document.getElementById('searchName').value;
    try {
        const response = await fetch(`http://localhost:3000/api/locations?name=${name}`);
        const data = await response.json();
        displayLocations(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayLocations(data) {
    const locationsDiv = document.getElementById('locations');
    if (data.length === 0) {
        locationsDiv.innerHTML = '<p>No data available.</p>';
        return;
    }
    locationsDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>City</th>
                    <th>Info</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(item => `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td><pre>${JSON.stringify(item.info, null, 2)}</pre></td>
                        <td>
                            <button onclick="updateLocation(${item.id})">Update</button>
                            <button onclick="deleteLocation(${item.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

async function updateLocation(id) {
    const name = prompt('Enter new name:');
    const info = prompt('Enter new info (in JSON format):');
    try {
        const response = await fetch(`http://localhost:3000/api/locations/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, info })
        });
        if (response.ok) {
            fetchLocations();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteLocation(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/locations/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchLocations();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchLocations();