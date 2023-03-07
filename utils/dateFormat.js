// This function adds the appropriate suffix to a date
const addDate = (date) => {
   // Convert the date to a string
    let dateStr = date.toString();
    
    // Get the last character of the string
    const lastChar = dateStr.charAt(dateStr.length - 1);
  

    // Add the appropriate suffix based on the last character
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
     // Return the string with the suffix added
    return dateStr;
  };
  
   // This exports a function that takes a timestamp and optional settings for formatting
  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {


    // Define an object to map month numbers to month names
    const months = {
      0: monthLength === 'short' ? 'J' : 'January',
      1: monthLength === 'short' ? 'F' : 'February',
      2: monthLength === 'short' ? 'M' : 'March',
      3: monthLength === 'short' ? 'A' : 'April',
      4: monthLength === 'short' ? 'M' : 'May',
      5: monthLength === 'short' ? 'J' : 'June',
      6: monthLength === 'short' ? 'J' : 'July',
      7: monthLength === 'short' ? 'A' : 'August',
      8: monthLength === 'short' ? 'S' : 'September',
      9: monthLength === 'short' ? 'O' : 'October',
      10: monthLength === 'short' ? 'N' : 'November',
      11: monthLength === 'short' ? 'D' : 'December',
    };
  

    // Create a new date object from the timestamp
    const dateObj = new Date(timestamp);
     // Get the formatted month name
    const formattedMonth = months[dateObj.getMonth()];
  
    // Get the day of the month with or without the suffix, depending on settings
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
    
    // Get the year
    const year = dateObj.getFullYear();

    // Get the hour in 12-hour format
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  


    // If the hour is 0 (midnight), change it to 12
    if (hour === 0) {
      hour = 12;
    }
  

    // Get the minutes
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  

    // Get the period of the day (am or pm)
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
    // Combine all the formatted components into a string and return it
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };