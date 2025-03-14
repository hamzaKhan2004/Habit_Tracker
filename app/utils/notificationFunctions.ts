/* eslint-disable prefer-const */
import { sendNotifications } from "../dashboard/notificationMessage";

// Function to schedule notifications
export default function scheduleNotifications(
  notificationTime: string,
  days: string[],
  habitName: string
) {
  // Map days to their numeric representation
  const daysMap: Record<string, number> = {
    SUN: 0,
    MON: 1,
    TUE: 2,
    WED: 3,
    THU: 4,
    FRI: 5,
    SAT: 6,
  };

  // Split the time string into hours, minutes, and AM/PM
  const [time, modifier] = notificationTime.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  // Convert to 24-hour format
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Get the current date and time
  const now = new Date();
  const nowDay = now.getDay();
  const nowTime = now.getTime();

  // Loop through selected days to schedule notifications
  days.forEach((day) => {
    const targetDay = daysMap[day];

    // Calculate day difference
    let diff = targetDay - nowDay;
    if (diff < 0) diff += 7; // If day has passed this week, move to next week

    // Create the target notification date
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + diff);
    targetDate.setHours(hours, minutes, 0, 0);

    // Calculate time difference in milliseconds
    const timeout = targetDate.getTime() - nowTime;

    if (timeout > 0) {
      console.log(`Notification scheduled for: ${targetDate}`);
      setTimeout(() => sendNotifications(habitName), timeout);
    } else {
      console.log(`Skipping past time: ${targetDate}`);
    }
  });
}
