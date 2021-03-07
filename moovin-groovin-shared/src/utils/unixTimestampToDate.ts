const unixTimestampToDate = (timestamp: number): Date =>
  new Date(timestamp * 1000);

export default unixTimestampToDate;
