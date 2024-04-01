// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT
  connectionString:"postgresql://User_owner:RvbA3f1qZzjk@ep-soft-bird-a1zpc4ts-pooler.ap-southeast-1.aws.neon.tech/User?sslmode=require"
});

const query = async (text, params) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    throw new Error(`Error executing query: ${error.message}`);
  }
};


module.exports = { query };
