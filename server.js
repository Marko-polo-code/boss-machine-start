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

// Setup API Router
app.use('/api', apiRouter);

// Setup Minions Router on API Router
apiRouter.use('/minions', minionsRouter);

// Start server
if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

module.exports = app;
