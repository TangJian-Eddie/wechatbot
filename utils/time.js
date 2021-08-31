function getDay(date) {
  var date_now = new Date();
  var date_last = new Date(date);
  var Days = parseInt(
    Math.abs(date_now.getTime() - date_last.getTime()) / 1000 / 60 / 60 / 24
  );
  return Days;
}
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = {
  getDay,
  delay,
};
