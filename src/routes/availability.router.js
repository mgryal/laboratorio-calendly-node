const express = require('express');
// const { listTimeZones } = require('timezone-support');
const validatorHandler = require('../middlewares/validator.handler');
const { getAvailabilityDto } = require('../dtos/availability.dtos');

const router = express.Router();

router.post(
  '/',
  validatorHandler(getAvailabilityDto, 'body'),
  async (req, res, next) => {
    try {
      console.log(req.body);
      // res.json(listTimeZones());
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
