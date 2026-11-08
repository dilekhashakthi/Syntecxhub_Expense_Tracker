const DAY_MS = 24 * 60 * 60 * 1000;

const daysAgo = (days) => {
  return new Date(Date.now() - days * DAY_MS);
};

const isWithinDays = (date, maxDays) => {
  const targetTime = new Date(date).getTime();

  if (Number.isNaN(targetTime)) {
    return false;
  }

  const minTime = Date.now() - maxDays * DAY_MS;
  // Allow a 1-day future margin for timezone differences
  const maxTime = Date.now() + DAY_MS;
  return targetTime >= minTime && targetTime <= maxTime;
};

module.exports = { DAY_MS, daysAgo, isWithinDays };
