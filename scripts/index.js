async function fetchCityData() {
    const city = document.getElementById('city').value;
    try {
        const response = await fetch('http://localhost:3000/api/fetch-city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city })
        });
        const data = await response.text();
        document.getElementById('result').innerText = data;
        
       // document.getElementById('resultCity').innerText = data;

       // resultCity.innerHTML = `
       // <p>Data inserted successfully</p>
       // <p><strong>City:</strong> ${data.city}</p>
       // <p><strong>Dominant Pollutant:</strong> ${data.dominentpol}</p>
       //  `;


    } catch (error) {
        console.error('Error:', error);
    }
}
