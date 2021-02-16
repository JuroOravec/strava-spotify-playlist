const wait = (ms = 0): Promise<void> => new Promise((res) => setTimeout(res, ms));

export default wait;
