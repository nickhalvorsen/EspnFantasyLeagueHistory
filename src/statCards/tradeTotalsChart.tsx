import { useStore } from "../useData";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const TradeTotalsChart = () => {
  const data = useStore((state) => state.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: teamStats.tradeCount,
    }))
    .sort((a, b) => b.value - a.value);

  const highestTrades = data[0].value;

  return (
    <HorizontalBarChart
      data={data}
      domainStart={0}
      domainEnd={highestTrades + 10}
    />
  );
};

export { TradeTotalsChart };
