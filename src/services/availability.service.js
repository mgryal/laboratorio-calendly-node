const { differenceInMinutes, add } = require('date-fns');
const scheduleService = require('./schedule.service');
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');

class AvailabilityService {
  async getAvailability({ scheduleId, date, timezone }) {
    const schedule = await new scheduleService().getById(scheduleId);
    const { duration, margin, availability } = schedule;
    const appointments = [];
    const bodyDate = new Date(date);
    const bodyUtcTime = zonedTimeToUtc(bodyDate, timezone);
    // const zonedTime = utcToZonedTime(bodyDate, timezone);
    availability[0].intervals.forEach((interval) => {
      const [startHour, startMinutes] = interval.startTime.split(':');
      const [endHour, endMinutes] = interval.endTime.split(':');
      console.log(startHour, startMinutes);
      const start = zonedTimeToUtc(
        add(bodyUtcTime, { hours: startHour, minutes: startMinutes }),
        timezone
      );
      const end = new Date(
        add(bodyUtcTime, { hours: endHour, minutes: endMinutes })
      );
      // const start = new Date(`${bodyUtcTime}T${interval.startTime}`);
      // const end = new Date(`${bodyUtcTime}T${interval.endTime}`);
      const minutesDifference = differenceInMinutes(end, start);
      const numberOfAppointments = Math.floor(
        minutesDifference / (duration + margin)
      );
      for (let i = 0; i < numberOfAppointments; i++) {
        const appointment = {
          startDate: add(start, {
            minutes: i * (duration + margin),
          }),
          endDate: add(start, {
            minutes: i * (duration + margin) + duration,
          }),
          status: 'on',
        };
        appointments.push(appointment);
      }
    });
    return appointments;
  }
}

module.exports = AvailabilityService;
