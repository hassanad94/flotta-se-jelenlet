export const firstDayOfWeek = () => {
  const date = new Date();
  const firstDayOfWeek = new Date(
    date.setDate(date.getDate() - (date.getDay() || 7) + 1)
  );

  return firstDayOfWeek.toISOString().slice(0, 10);
};
