export function hexToRgba(hex: string, alpha: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function formatDate(date: Date): string {
  return (
    date.getDate() +
    ' ' +
    date.toLocaleString('default', { month: 'long' }) +
    ' ' +
    date.getFullYear()
  );
}
