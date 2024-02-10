const MILISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;

const milisecondsToMinutes = (miliseconds) => {
  return Math.floor(miliseconds / MILISECONDS_IN_SECOND / SECONDS_IN_MINUTE);
};

const addMinutesToDate = (date, minutes) => {
  return new Date(
    date.getTime() + minutes * MILISECONDS_IN_SECOND * SECONDS_IN_MINUTE
  );
};

module.exports = {
  milisecondsToMinutes,
  addMinutesToDate,
};
