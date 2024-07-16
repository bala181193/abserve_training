// const dateMethods = (date) => {
//   let now = new Date(date);
//   console.log(now);
//   // now = `${now}T23:59:59.000Z`;

//   now = `${now.getFullYear()}-${
//     now.getMonth() <= 1
//       ? "0" + (now.getMonth() + 1)
//       : now.getMonth() + 1 <= 9
//       ? "0" + (now.getMonth() + 1)
//       : now.getMonth() + 1
//   }-${now.getDate() < 9 ? "0" + now.getDate() : now.getDate()}T23:59:59.000Z`;
//   console.log(now);

//   // let specificDate = new Date(2024, 6, 3, 14, 30, 0); // Year, Month (0-based), Day, Hour, Minute, Second
//   // console.log(specificDate); // Outputs the specified date and time
//   // let dateString = new Date("2024-07-03T14:30:00");
//   // console.log(dateString); // Outputs the specified date and time in ISO format
//   // let milliseconds = new Date(1625560200000);
//   // console.log(milliseconds); // Outputs the date corresponding to the milliseconds
//   // let parsedDate = Date.parse("2024-07-03T14:30:00");
//   // console.log(parsedDate); // Outputs the milliseconds since Epoch
//   // let dateFromParsed = new Date(parsedDate);
//   // console.log(dateFromParsed); // Outputs the date corresponding to the parsed milliseconds

//   // let year = now.getFullYear();
//   // let Month = now.getMonth();
//   // let date = now.getDate();
//   // let day = now.getDay();
//   // let min = now.getMinutes();
//   // let hours = now.getHours();
//   // let milliseconds = now.getMilliseconds();
//   // let time = now.getTime();
//   // // console.log(time, milliseconds); // Outputs the current year
//   // now.setMinutes(20); // Sets the minute to 45
//   // console.log(now);
//   // let utcYear = now.getUTCFullYear();
//   // let utcMonth = now.getUTCMonth();
//   // let utcDate = now.getUTCDate();
//   // console.log(`UTC Date: ${utcYear}-${utcMonth + 1}-${utcDate}`);
//   // let isoString = now.toISOString();
//   // console.log(isoString); // Outputs the date and time in ISO 8601 format

//   // let localeDateString = now.toLocaleDateString();
//   // console.log(localeDateString); // Outputs the date in the local format

//   // let localeTimeString = now.toLocaleTimeString();
//   // console.log(localeTimeString); // Outputs the time in the local format

//   // let localeString = now.toLocaleString();
//   // console.log(localeString); // Outputs the date and time in the local format
// };

// dateMethods("2024-01-01");
