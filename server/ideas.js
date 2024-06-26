const express = require('express');
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send('Idea not found.');
  }
});

ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(500).send('Idea not found.');
  }
});

module.exports = ideasRouter;
