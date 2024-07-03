const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Configura la conexión a MySQL
const db = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',       // Reemplaza con tu servidor de base de datos
    user: 'sql7717690',     // Reemplaza con tu usuario de base de datos
    password: 'RCkJcAnlS3', // Reemplaza con tu contraseña de base de datos
    database: 'sql7717690',     // Reemplaza con el nombre de tu base de datos
    port: 3306                         // Reemplaza con tu puerto de base de datos si es diferente
});

/* 
Server: sql7.freemysqlhosting.net
Name: sql7717690
Username: sql7717690
Password: RCkJcAnlS3
Port number: 3306
 */

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Leer todos los datos de AQI
app.get('/api/aqi', (req, res) => {
    db.query('SELECT * FROM aqi', (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

// Crear nuevos datos de AQI
app.post('/api/aqi', (req, res) => {
    const { city, aqi, dominantpol } = req.body;
    db.query('INSERT INTO aqi (city, aqi, dominantpol) VALUES (?, ?, ?)', [city, aqi, dominantpol], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send(err);
            return;
        }
        res.status(201).send('Data inserted');
    });
});

// Actualizar datos de AQI
app.put('/api/aqi/:city', (req, res) => {
    const city = req.params.city;
    const { aqi, dominantpol } = req.body;
    db.query('UPDATE aqi SET aqi = ?, dominantpol = ? WHERE city = ?', [aqi, dominantpol, city], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).send(err);
            return;
        }
        res.send('Data updated');
    });
});

// Eliminar datos de AQI
app.delete('/api/aqi/:city', (req, res) => {
    const city = req.params.city;
    db.query('DELETE FROM aqi WHERE city = ?', [city], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send(err);
            return;
        }
        res.send('Data deleted');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
