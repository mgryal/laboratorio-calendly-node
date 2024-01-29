const Joi = require('joi');
const { listTimeZones } = require('timezone-support');
Joi.objectId = require('joi-objectid')(Joi);

const scheduleId = Joi.objectId();
const date = Joi.date();
const timezone = Joi.string().valid(...listTimeZones());

const getAvailabilityDto = Joi.object({
  scheduleId: scheduleId.required(),
  date: date.required(),
  timezone: timezone.required(),
});

module.exports = { getAvailabilityDto };
