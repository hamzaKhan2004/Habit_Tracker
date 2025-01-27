export function getDateString(currentDate: Date, daysOffset = 0) {
  const adjustedDate = new Date(currentDate);
  adjustedDate.setDate(currentDate.getDate() + daysOffset);

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, "0");
  const day = String(adjustedDate.getDate()).padStart(2, "0");
  console.log(adjustedDate);
  return `${year}-${month}-${day}`;
}

export function getCurrentDayName(dateString: string) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date(dateString);
  const currentDayNumber = currentDate.getDay();
  return daysOfWeek[currentDayNumber];
}

export function getFormattedDate(dateString: string): string {
  const currentDate = new Date(dateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}
