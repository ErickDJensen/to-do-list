const express = require('express');
const bodyParser = require('body-parser');

// const pool =require('./modules/pool');

const taskRouter = require('./routes/task.router')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/tasks', taskRouter);




app.listen(PORT, () => {
  console.log('server running on: ', PORT);
}); 



// pool.on('connect', () => {
//   console.log('Database Connection established...');
// })

// pool.on('error', (error) => {
//   console.log('Database error:', error);
// })
