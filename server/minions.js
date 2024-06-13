const express = require('express');
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
  } = require('./db');

// Minions Routes
minionsRouter.get('/', (req, res) => {
  const allMinions = getAllFromDatabase('minions');
  res.send(allMinions);
});

minionsRouter.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send('Minion not found.');
  }
});

minionsRouter.put('/:minionId', (req, res) => {
  req.body.id = req.params.minionId;
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send('Minion not found.');
  }
});

module.exports = minionsRouter;
