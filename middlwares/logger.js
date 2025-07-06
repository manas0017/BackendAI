const morgan = require('morgan');
const config = require('../config');

const logger = morgan(config.nodeEnv === 'production' ? 'combined' : 'dev');

module.exports = logger;