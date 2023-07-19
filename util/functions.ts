export const formatDuration = (duration_ms: number): string => {
  if (typeof duration_ms != "number") {
    return "0:00";
  }

  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
