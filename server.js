const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const wimbledonRoutes = require('./routes/wimbledon');
const logger = require('./middlwares/logger');
const apiLimiter = require('./middlwares/rateLimiter');
const { errorHandler, notFound } = require('./middlwares/errorHandler');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(logger);

app.use('/wimbledon', apiLimiter, wimbledonRoutes);

app.get('/', (req, res) => {
  res.send('api is working fine');
});

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`running in ${config.nodeEnv} mode on http://localhost:${config.port}`);
});

module.exports = app;