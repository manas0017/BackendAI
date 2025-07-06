require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  rateLimit: {
    windowMs: (process.env.RATE_LIMIT_WINDOW_MINUTES || 15) * 60 * 1000,
    max: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  },
};

module.exports = config;