const axios = require('axios');
const db = require('../config/db');

exports.fetchCity = async (req, res) => {
    const { city } = req.body;
    const apiToken = process.env.API_TOKEN;
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
};

exports.getLocations = (req, res) => {
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
};

exports.updateLocation = (req, res) => {
    const { id } = req.params;
    const { name, info } = req.body;

    db.query('UPDATE Location SET name = ?, info = ? WHERE id = ?', [name, info, id], (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send(err);
        }
        res.send('Data updated successfully');
    });
};

exports.deleteLocation = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM Location WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error deleting data:', err);
            return res.status(500).send(err);
        }
        res.send('Data deleted successfully');
    });
};
