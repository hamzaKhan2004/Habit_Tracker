import { sendNotifications } from "../dashboard/notificationMessage";

// sendNotifications
export default function scheduleNotifications(
  notificationTime: string,
  days: string[],
  habitName: string
) {
  const daysMap: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };

  //Split the notifications time into the time and the AM/PM modifier

  const [time, modifier] = notificationTime.split("");

  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":").map(Number);
  //Adjust hours based on AM/PM modifier
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  //Create a new Date object for the notifications time
  const notificationDate = new Date();
  notificationDate.setHours(hours);
  notificationDate.setMinutes(minutes);
  notificationDate.setSeconds(0);

  //Get the current date and time
  const now = new Date();
  //Get the current day of the week
  const nowDay = now.getDay();
  //Get the current time in milliseconds
  const nowTime = now.getTime();

  days.forEach((day) => {
    const targetDay = daysMap[day];
    let diff = targetDay - nowDay;
    if (diff < 0) diff += 7;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    targetDate.setHours(hours);
    targetDate.setMinutes(minutes);
    targetDate.setSeconds(0);

    //Calculate the timeout duration
    const timeout = targetDate.getTime() - nowTime;
    setTimeout(() => sendNotifications(habitName), timeout);
  });
}
