export function formatTime(millis) {
  if (millis > 90 * 1000) {
    // 90 seconds or longer
    const mins = Math.round(millis / 1000 / 60);
    const sec = Math.round((millis / 1000) % 60);
    return `${mins}m ${sec}s`;
  }
  if (millis > 4 * 1000) {
    // 4 seconds or longer
    return `${Math.round(millis / 1000)}s`;
  }
  return `${Math.round(millis)}ms`;
}
