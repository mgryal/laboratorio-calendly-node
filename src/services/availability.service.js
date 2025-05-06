const ScheduleService = require('./schedule.service');
const { format, parse, parseISO } = require('date-fns');

const scheduleService = new ScheduleService();

const examples = [
  {
    startDate: '2022-07-18T14:25:00.000Z',
    endDate: '2022-07-18T14:45:00.000Z',
    status: 'on',
  },
  {
    startDate: '2022-07-18T14:50:00.000Z',
    endDate: '2022-07-18T15:10:00.000Z',
    status: 'off',
  },
];

class AvailabilityService {
  async getAvailability({ timezone, date, scheduleId }) {
    const dateObj = parse(date, 'yyyy-MM-dd', new Date());
    const schedule = await scheduleService.getById(scheduleId);
    const day = format(dateObj, 'EEEE').toLowerCase();
    console.log('day', day, date, dateObj);

    const availabilities = [];

    const scheduleAvailability = schedule.availability.find(
      (item) => item.day === day
    );

    scheduleAvailability.intervals.forEach((interval) => {
      const duration = interval.duration;
      const margin = interval.margin;
    });

    return '';
  }
}

module.exports = AvailabilityService;
