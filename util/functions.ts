export const formatDuration = (duration_ms: number): string => {
  if (typeof duration_ms != "number") {
    return "0:00";
  }

  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function millisecondsToHours(milliseconds: number): number {
  const hours = milliseconds / (1000 * 60 * 60);
  return hours;
}

export function getGreeting(): string {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}
