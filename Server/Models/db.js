// db.js
const { Pool } = require('pg');
const {createTables} = require('./createTabels');
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
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
    return result;
  } catch (error) {
    throw new Error(`Error executing query: ${error.message}`);
  }
};

module.exports = { query };
