const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT
});

module.exports = { pool };