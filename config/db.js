const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

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

module.exports = db;
