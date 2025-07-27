"use client";

import { useStore } from "../useData";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const AveragePointsChart = () => {
  let data = useStore((state) => state.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: Number(teamStats.averagePointsPerGame.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return <HorizontalBarChart data={data} domainStart={100} domainEnd={150} />;
};

export { AveragePointsChart };
