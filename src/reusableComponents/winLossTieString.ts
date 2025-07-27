const winLossTieString = (
  wins: number,
  losses: number,
  ties: number
): string => {
  if (ties > 0) {
    return `${wins}–${losses}–${ties}`;
  }
  return `${wins}–${losses}`;
};

export { winLossTieString };
