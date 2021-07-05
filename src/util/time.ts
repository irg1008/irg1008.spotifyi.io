const parseMills = (ms: number) => {
  const millsToMins = 1000 * 60; // 1000 mills in 1 second and 60 seconds in 1 min.
  const minutes = Math.floor(ms / millsToMins);
  const seconds = Math.floor((ms % millsToMins) / 1000);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds.toFixed(0)}`;
};

export { parseMills };
