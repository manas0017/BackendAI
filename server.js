const express = require('express');
const helmet = require('helmet');
const config = require('./config');
const wimbledonRoutes = require('./routes/wimbledon');
const logger = require('./middlwares/logger');
const apiLimiter = require('./middlwares/rateLimiter');
const { errorHandler, notFound } = require('./middlwares/errorHandler');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'script-src': ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname)));
app.use(cors());

app.use('/wimbledon', apiLimiter, wimbledonRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(notFound);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`running in ${config.nodeEnv} mode on http://localhost:${config.port}`);
});

module.exports = app;