const scheduleService = require('./schedule.service');

class AvailabilityService {
  async getAvailability({ scheduleId, date, timezone }) {
    const schedule = await new scheduleService().getById(scheduleId);
    console.log(schedule);
  }
}

module.exports = AvailabilityService;
