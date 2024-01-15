import moment from "moment";

const validateResDateTime = (date, time) => {
  const currentDateTime = moment();
  const userDateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");

  if (userDateTime.isBefore(currentDateTime, "day")) {
    return "Invalid Date! Date should not be less than the current date.";
  }

  if (userDateTime.isSame(currentDateTime, "day") && userDateTime.isBefore(currentDateTime)) {
    return "Invalid Time! Time has already passed on the current date.";
  }

  if (userDateTime.isSame(currentDateTime, "day")) {
    const oneHourFromNow = currentDateTime.clone().add(1, "hour");
    if (userDateTime.isBefore(oneHourFromNow)) {
      return "Invalid Time! Reservation time should be at least 1 hour from now.";
    }
  }

  const userTime = userDateTime.format("HH:mm");
  const startTime = moment("12:00", "HH:mm");
  const endTime = moment("02:00", "HH:mm").add(1, "day");

  if (!moment(userTime, "HH:mm").isBetween(startTime, endTime)) {
    return "Invalid Time! Reservation time should be between 12 PM and 2 AM.";
  }

  return false;
};

export default validateResDateTime;
