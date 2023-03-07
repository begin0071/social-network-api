const addDateSuffix = (date) => {
    let dateStr = date.toString();
  
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === '1' && dateStr !== '11') {
      dateStr = `${dateStr}st`;
    } else if (lastChar === '2' && dateStr !== '12') {
      dateStr = `${dateStr}nd`;
    } else if (lastChar === '3' && dateStr !== '13') {
      dateStr = `${dateStr}rd`;
    } else {
      dateStr = `${dateStr}th`;
    }
  
    return dateStr;
  };
  

  module.exports = (
    timestamp,
    { monthLength = 'short', dateSuffix = true } = {}
  ) => {

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
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
  
    const dayOfMonth = dateSuffix
      ? addDateSuffix(dateObj.getDate())
      : dateObj.getDate();
  
    const year = dateObj.getFullYear();
    let hour =
      dateObj.getHours() > 12
        ? Math.floor(dateObj.getHours() - 12)
        : dateObj.getHours();
  
    if (hour === 0) {
      hour = 12;
    }
  
    const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();
  
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
    const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  
    return formattedTimeStamp;
  };