
const { Pool } = require('pg');
require('dotenv').config();
// PostgreSQL database configuration

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});
// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});


module.exports = pool;
