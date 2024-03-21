// db.js
const { Pool } = require('pg');
const {createTables} = require('./createTabels');
const config = require('../Config/config');

const pool = new Pool({
  user: config.development.database.user,
  host: config.development.database.host,
  database: config.development.database.database,
  password: config.development.database.password,
  port: config.development.database.port
});

createTables()
  .then(() => {
    console.log('Tables created successfully');
    return query('SELECT * FROM users');
  })
  .then((result) => console.log('Query result:', result))
  .catch((error) => console.error('Error:', error.message));

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (error) {
    throw new Error(`Error executing query: ${error.message}`);
  }
};

module.exports = { query };
