const express = require('express');
const geoip = require('geoip-lite');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', true);

app.get('/status', async (req, res) => {
  try {
    await db.pool.query('SELECT true;');
  } catch (error) {
    return res.status(503).send({error});
  }

  res.status(200).send({ status: 'running' });
})
app.get('/', async (req, res) => {
  const ip = req.ip;
  const geo = geoip.lookup(ip);

  let query = geo ? `INSERT INTO knocking(ip, country, city, timezone, time)
    VALUES ('${ip}', '${geo.country}', '${geo.city}', '${geo.timezone}', (to_timestamp(${Date.now()} / 1000.0)))
    RETURNING *;` : 
    `INSERT INTO knocking(ip, time)
      VALUES ('${ip}', (to_timestamp(${Date.now()} / 1000.0)))
      RETURNING *;`;

  try {
    const result = await db.pool.query(query);
    res.status(200).send(result.rows[0]);
  } catch (err) {
    res.status(500).send(`Service is unavailable because of error: ${err}`);
  }
})

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
})