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


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); 

//GET from client
app.get('/tasks', (req, res) => {
  console.log('in /tasks GET');
  let sqlText = `SELECT * FROM "weekendToDo" ORDER BY "id";`;
  pool.query(sqlText)
    .then(result => {
      console.log('Result: ', result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('Gon an error on Select query', error);
      res.sendStatus(500);
    })
})//end GET


//POST from client
app.post('/tasks', (req, res) => {
  console.log('In /tasks POST');
  let sqlText = `INSERT INTO "weekendToDo" ("task") VALUES ($1);`;
  pool.query(sqlText, [req.body.task])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error adding new task`, error);
      res.sendStatus(500);
    });
})//end POST

//DELETE from client
app.delete('/tasks/:id', (req, res) => {
  console.log('In /tasks DELETE');
  console.log('req.params', req.params);
  pool.query(`DELETE FROM "weekendToDo" WHERE "id"=$1;`, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error deleting task`, error);
      res.sendStatus(500);
    });
})//end DELETE

//PUT from client
app.put('/tasks/:id', (req, res) => {
  console.log('In /tasks PUT');
  console.log('req.params', req.params);
  pool.query(`UPDATE "weekendToDo" SET "status"='Completed' WHERE "id"=$1;`, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(`Error updating task`, error);
      res.sendStatus(500);
    });
})//end PUT


