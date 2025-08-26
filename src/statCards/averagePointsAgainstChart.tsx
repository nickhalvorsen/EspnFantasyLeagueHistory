import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const AveragePointsAgainstChart = () => {
  let data = useStore((state) => state.allData.teamStats)
    .map((teamStat) => ({
      label: teamStat.team.managerName,
      value: Number(teamStat.averagePointsAgainstPerGame.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return <HorizontalBarChart data={data} domainStart={100} domainEnd={150} />;
};

export { AveragePointsAgainstChart };
