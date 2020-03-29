const pg = require('pg');


const pool = pg.Pool({
    host: 'localhost', // where your database is
    port: 5432,
    database: 'weekend-to-do-app', // Change to match your DB
    max: 10,
    idleTimeoutMillis: 30000 // 30 second timeout on idle queries
  });

  module.exports = pool;