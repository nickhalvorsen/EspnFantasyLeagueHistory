import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

type Props = {
  managerEspnId: string;
};

const ManagerBestYearlyAveragePointsChart = ({ managerEspnId }: Props) => {
  const allData = useStore((state) => state.allData.teamStats);
  const data = allData
    .find((teamStats) => teamStats.team.espnId === managerEspnId)
    ?.averagePointsBySeason.map((season) => ({
      label: season.year.toString(),
      value: Number(season.average.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const allAveragePoints = allData.flatMap((teamStats) =>
    teamStats.averagePointsBySeason.map((season) => season.average)
  );
  const maxAverage = Math.max(...allAveragePoints);
  const domainEnd = Math.ceil((maxAverage + 5) / 5) * 5;

  if (!data) return null;

  return (
    <HorizontalBarChart data={data} domainStart={100} domainEnd={domainEnd} />
  );
};

export { ManagerBestYearlyAveragePointsChart };
