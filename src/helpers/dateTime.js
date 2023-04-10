export const toDate = (date) => {
  const newDate = new Date(Date.parse(date));
  return newDate.toLocaleDateString("en-US");
};

export const toTime = (date) => {
  const newTime = new Date(Date.parse(date));
  return newTime.toLocaleTimeString("en-US");
};
