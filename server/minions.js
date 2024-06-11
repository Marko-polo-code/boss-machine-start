const express = require('express');
const minionsRouter = express.Router();

minionsRouter.get('/', (req, res, next) => {
  const allMinions = getAllFromDatabase('minions');
  res.send(allMinions);
  next();
});

minionsRouter.post('/', (req, res, next) => {
  req.body = addToDatabase('minions', req.body);
  res.status(201).send(req.body);
  next();
});

minionsRouter.get('/:minionId', (req, res, next) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
  next();
});

minionsRouter.put('/:minionId', (req, res, next) => {
  req.body.id = req.params.minionId;
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
  next();
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
});

module.exports = minionsRouter;
