import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const AveragePointsChart = () => {
  const data = useStore((state) => state.allData.teamStats)
    .map((teamStat) => ({
      label: teamStat.team.managerName,
      value: Number(teamStat.averagePointsPerGame.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return <HorizontalBarChart data={data} domainStart={100} domainEnd={150} />;
};

export { AveragePointsChart };
