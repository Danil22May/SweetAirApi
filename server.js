const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

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

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/api/fetch-city', async (req, res) => {
    const { city } = req.body;
    const apiToken = '095b5eb0cab92e4551eeccf569b81bf8244dcb1b';
    const apiUrl = `https://api.waqi.info/feed/${city}/?token=${apiToken}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.status !== 'ok') {
            return res.status(400).send('Error fetching data from API');
        }

        db.query('INSERT INTO Location (name, info) VALUES (?, ?)', [city, JSON.stringify(data)], (err, result) => {    
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send(err);
            }
            res.status(201).send('Data inserted successfully');
        });
    } catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Error fetching data from API');
    }
});

// CRUD endpoints for the locations table
// Ruta para obtener todas las ubicaciones o buscar por nombre
app.get('/api/locations', (req, res) => {
    const { name } = req.query;
    let query = 'SELECT * FROM Location';
    let queryParams = [];

    if (name) {
        query += ' WHERE name LIKE ?';
        queryParams.push(`%${name}%`);
    }

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
        } else {
            res.json(results);
        }
    });
});

app.put('/api/locations/:id', (req, res) => {
    const { id } = req.params;
    const { name, info } = req.body;
    // db.query('UPDATE locations SET name = ?, info = ? WHERE id = ?', [name, info, id], (err, result) => {
    db.query('UPDATE Location SET name = ?, info = ? WHERE id = ?', [name, info, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send(err);
        }
        res.send('Data updated successfully');
    });
});

app.delete('/api/locations/:id', (req, res) => {
    const { id } = req.params;
    // db.query('DELETE FROM locations WHERE id = ?', [id], (err, result) => {
        db.query('DELETE FROM Location WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).send(err);
        }
        res.send('Data deleted successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
