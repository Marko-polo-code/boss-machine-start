const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Import routers
const apiRouter = require('./server/api');
const minionsRouter = require('./server/minions');
const ideasRouter = require('./server/ideas');
const meetingsRouter = require('./server/meetings');

// Setup API Router
console.log('Setting up /api route');
app.use('/api', apiRouter);

// Setup Minions, Ideas Router on API Router
console.log('Setting up /api/minions route');
apiRouter.use('/minions', minionsRouter);
console.log('Setting up /api/ideas route');
apiRouter.use('/ideas', ideasRouter);
console.log('Setting up /api/meetings route');
apiRouter.use('/meetings', meetingsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
