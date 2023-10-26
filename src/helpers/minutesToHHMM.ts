export function minutesToHHMM(minutes: number) {
  if (isNaN(minutes) || minutes < 0) {
    return "Invalid input";
  }

  const adjustedMinutes = (minutes + 480) % 1440; // Adding 480 to handle the shift from 0 to 8:00
  const hours = Math.floor(adjustedMinutes / 60);
  const remainingMinutes = adjustedMinutes % 60;

  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr =
    remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;

  return `${hoursStr}:${minutesStr}`;
}
