const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(helmet());

const knex = require('knex');

const knexConfig = {
   client: 'sqlite3',
   connection: {
     filename: './data/rolex.db3', // from root folder
   },
   useNullAsDefault: true, // needed for sqlite
 };

const db = knex(knexConfig);

server.post('/api/cohorts', async (req, res) => {
   try {
      const [ id ] = await db('cohorts').insert(req.body)
      const cohort = await db('cohorts').where({ id }).first();
      res.status(201).json(cohort);
   } catch {
      res.status(500).json({ error: "There was an error posting data"})
   }
})

server.get('/api/cohorts', async (req, res) => {
   try {
      const cohorts = await db('cohorts');
      res.status(200).json(cohorts);
   } catch {
      res.status(500).json({ error: "There was an error retrieving data"});
   }
})

module.exports = server; // MUST EXPORT
