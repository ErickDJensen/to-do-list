const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

//GET from client
router.get('/', (req, res) => {
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
  router.post('/', (req, res) => {
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
  router.delete('/:id', (req, res) => {
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
  router.put('/:id', (req, res) => {
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

  
  module.exports = router;