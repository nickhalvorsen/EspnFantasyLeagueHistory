import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const TradeTotalsChart = () => {
  const data = useStore((state) => state.allData.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: teamStats.tradeCount,
    }))
    .sort((a, b) => b.value - a.value);

  const highestTrades = data[0].value;
  // round up to nearest 5
  const domainEnd = Math.ceil((highestTrades + 1) / 5) * 5;

  return (
    <HorizontalBarChart data={data} domainStart={0} domainEnd={domainEnd} />
  );
};

export { TradeTotalsChart };
