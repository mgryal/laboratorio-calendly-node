const { milisecondsToMinutes, addMinutesToDate } = require('../utils/date');
const scheduleService = require('./schedule.service');

function HoursToMinutes(hours) {
  return hours * 60;
}

class AvailabilityService {
  async getAvailability({ scheduleId, date, timezone }) {
    const schedule = await new scheduleService().getById(scheduleId);
    const { duration, margin, availability } = schedule;
    const appointments = [];
    availability[0].intervals.forEach((interval) => {
      const start = new Date(`${date}T${interval.startTime}`);
      const end = new Date(`${date}T${interval.endTime}`);
      const minutesDifference = milisecondsToMinutes(end - start);
      const numberOfAppointments = Math.floor(
        minutesDifference / (duration + margin)
      );
      for (let i = 0; i < numberOfAppointments; i++) {
        const appointment = {
          start: addMinutesToDate(start, i * (duration + margin)),
          end: addMinutesToDate(start, i * (duration + margin) + duration),
        };
        console.log(appointment);
        appointments.push(appointment);
      }
    });
    console.log(appointments, 'appointments');
    return appointments;
  }
}

module.exports = AvailabilityService;
