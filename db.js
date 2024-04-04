const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    database: 'cloud-notify-db',
    password: 'Zamb2753',
    host: 'cloud-notify-database.cf4o0eie4xap.eu-north-1.rds.amazonaws.com',
    port: 5432
});

module.exports = { pool };