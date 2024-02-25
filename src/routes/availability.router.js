const express = require('express');
// const { listTimeZones } = require('timezone-support');
const validatorHandler = require('../middlewares/validator.handler');
const { getAvailabilityDto } = require('../dtos/availability.dtos');
const AvailabilityService = require('../services/availability.service');

const router = express.Router();
const service = new AvailabilityService();

router.post(
  '/',
  validatorHandler(getAvailabilityDto, 'body'),
  async (req, res, next) => {
    try {
      const appointments = await service.getAvailability(req.body);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
