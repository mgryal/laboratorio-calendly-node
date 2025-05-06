const express = require('express');

const AvailabilityService = require('../services/availability.service');

const router = express.Router();
const service = new AvailabilityService();

router.post('/', async (req, res, next) => {
  try {
    const { date, scheduleId, timezone } = req.body;
    const availableSpaces = await service.getAvailability({
      date,
      scheduleId,
      timezone,
    });
    res.json(availableSpaces);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
