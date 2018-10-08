function processDate(timestamp) {
  let date = new Date(0); // 0 sets the date to the epoch
  date.setUTCMilliseconds(timestamp);
  return date.toISOString();
}

module.exports = { processDate };
