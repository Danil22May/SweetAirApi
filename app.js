const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const locationRoutes = require('./routes/locationRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', locationRoutes);
app.use('/api', commentRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const db = require('./config/db');

db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) throw err;
    console.log('The solution is: ', results[0].solution);
});
