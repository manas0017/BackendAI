const rateLimiter = require('express-rate-limit');
const config = require("../config")

const apiLimiter = rateLimiter({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again after 15 minutes.' },
});

module.exports = apiLimiter;