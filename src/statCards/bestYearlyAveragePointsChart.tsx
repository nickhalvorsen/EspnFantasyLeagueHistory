"use client";

import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const BestYearlyAveragePointsChart = () => {
  let data = useStore((state) => state.allData.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: Number(teamStats.bestSeasonAveragePoints[0].average.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return <HorizontalBarChart data={data} domainStart={100} domainEnd={150} />;
};

export { BestYearlyAveragePointsChart };
