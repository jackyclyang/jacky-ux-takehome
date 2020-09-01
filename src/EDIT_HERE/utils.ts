const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getFormattedDateString = (dateString: string) => {
  const d = new Date(dateString);
  return `${months[d.getMonth()]} ${d.getDate()} ${d.getHours()}:00`;
};
