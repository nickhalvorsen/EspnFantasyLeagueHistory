"use client";

import { useStore } from "../useData";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const WorstYearlyAveragePointsChart = () => {
  let data = useStore((state) => state.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: Number(teamStats.worstSeasonAveragePoints[0].average.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return <HorizontalBarChart data={data} domainStart={80} domainEnd={150} />;
};

export { WorstYearlyAveragePointsChart };
