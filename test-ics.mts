// import ical
const ical = require('node-ical');

const data = fetch(
  'https://www.airbnb.fr/calendar/ical/780366908354735506.ics?s=e532e6af4be0fce49b0434409ffcf3aa',
)
  .then((response) => response.text())
  .then((data) => console.log('dedans', data));

console.log(data);

// // or a URL
// ical.async.fromURL(
//   'http://lanyrd.com/topics/nodejs/nodejs.ics',
//   function (err, data) {
//     console.log(data);
//   },
// );
