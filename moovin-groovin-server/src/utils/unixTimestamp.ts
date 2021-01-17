const unixTimestamp = (date: Date | number | string = new Date()): number => {
  return Math.round(new Date(date).getTime() / 1000);
};

export default unixTimestamp;
