export function formatDateRange(startDate: Date, endDate: Date): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const startFormat = `${
    monthNames[startDate.getMonth()]
  } ${startDate.getDate()}, ${startDate.getFullYear()}`;
  const endFormat = `${
    monthNames[endDate.getMonth()]
  } ${endDate.getDate()}, ${endDate.getFullYear()}`;

  return `${startFormat} - ${endFormat}`;
}
