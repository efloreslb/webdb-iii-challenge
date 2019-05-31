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

server.get('/api/cohorts/:id', async (req, res) => {
   try {
      const cohort = await db('cohorts').where({ id: req.params.id }).first();
      res.status(200).json(cohort);
   } catch {
      res.status(500).json({ error: "There was an error retrieving data"});
   }
})

server.get('/api/cohorts/:id/students', async (req, res) => {
   try {
      const students = await db('students').where({ cohorts_id: req.params.id })
      res.status(200).json(students);
   } catch {
      res.status(500).json({ error: "There was an error retrieving student data for that cohort" })
   }
})

server.delete('/api/cohorts/:id', async (req, res) => {
   try {
      const count = await db('cohorts').where({ id: req.params.id }).del();
      if(count > 0) {
         res.status(200).json({ message: `${count} cohort record deleted`})
      } else {
         res.status(404).json({ message: "Cohort by ID not found"})
      }
   } catch {
      res.status(500).json({ error: "There was an error deleting data" })
   }
})

server.put('/api/cohorts/:id', async (req, res) => {
   try {
      const count = await db('cohorts').where({ id: req.params.id }).update(req.body);
      if(count > 0) {
         res.status(200).json({ message: `${count} cohort record updated`})
      } else {
         res.status(404).json({ message: "Cohort by ID not found"})
      }
   } catch {
      res.status(500).json({ error: "There was an error updating data" })
   }
})

module.exports = server; // MUST EXPORT
