const express = require('express');
const router = express.Router();
const finalsData = require('../data/finals');

router.get('/', (req, res) => {
  const { year } = req.query;

  if (!year || !/^\d{4}$/.test(year)) {
    return res.status(400).json({ error: 'A valid 4-digit year must be provided.' });
  }

  const final = finalsData[year];

  if (final) {
    return res.json(final);
  }

  return res.status(404).json({ error: `Wimbledon final data for the year ${year} not found.` });
});

module.exports = router;