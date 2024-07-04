// script.js
//const token = '05b53275-8f2b-42b0-9240-49e4cd5ae575';
const token = '095b5eb0cab92e4551eeccf569b81bf8244dcb1b';
const baseURL = 'https://api.waqi.info/feed';


// Función para obtener datos de calidad del aire
// async function fetchAQIData(city = 'beijing') {
    async function fetchAQIData(city = 'madrid') {
    try {
        const response = await fetch(`${baseURL}/${city}/?token=${token}`);
        const data = await response.json();
        if (data.status === 'ok') {
            displayAQIData(data.data);
        } else {
            console.error('Error fetching data:', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar los datos en la página
function displayAQIData(data) {
    const aqiDiv = document.getElementById('aqi-data');
    aqiDiv.innerHTML = `
        <h2>City: ${data.city.name}</h2>
        <p>AQI: ${data.aqi}</p>
        <p>Dominant Pollutant: ${data.dominentpol}</p>
        <button onclick="updateAQIData('${data.city.name}')">Update</button>
        <button onclick="deleteAQIData('${data.city.name}')">Delete</button>
    `;
}

// Función para actualizar los datos (placeholder)
function updateAQIData(city) {
    alert(`Updating data for ${city}`);
    // Aquí se agregaría la lógica para actualizar los datos
}

// Función para eliminar los datos (placeholder)
function deleteAQIData(city) {
    alert(`Deleting data for ${city}`);
    // Aquí se agregaría la lógica para eliminar los datos
}

// Llamar a la función para obtener datos inicialmente
fetchAQIData();
