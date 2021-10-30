export const formatDate = (date: Date) =>
  new Date(date).toDateString().replace(/\w+\s/, '');
