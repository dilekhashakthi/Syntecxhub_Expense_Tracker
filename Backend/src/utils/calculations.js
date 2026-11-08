const round2 = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

const sumAmounts = (items = []) => {
  const sum = items.reduce((total, item) => total + (Number(item?.amount) || 0), 0);
  return round2(sum);
};

module.exports = { sumAmounts, round2 };
