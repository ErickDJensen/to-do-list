const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app', // Change to match your DB
    host: 'localhost', // where your database is
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000 // 30 second timeout on idle queries
});

pool.on('connect', () => {
    console.log('Database Connection established...');
})

pool.on('error', (error) => {
    console.log('Database error:', error);
})


// use bodyParser.urlencoded throughout the app with this:
app.use(bodyParser.urlencoded({
    extended: true
}));

// serve back static files
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('server running on: ', PORT);
}); // end spin up server

app.get('/tasks', (req, res) => {
    console.log('in /tasks GET');
    let sqlText = `SELECT * FROM "weekendToDo";`;
    pool.query(sqlText)
        .then(result => {
            console.log('Result: ', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Gon an error on Select query', error);
            res.sendStatus(500);
        })
})
