"use client";

import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";
import { useStore } from "@/data/useStore";

const WorstYearlyAveragePointsChart = () => {
  let data = useStore((state) => state.allData.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: Number(teamStats.worstSeasonAveragePoints[0].average.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  return <HorizontalBarChart data={data} domainStart={80} domainEnd={150} />;
};

export { WorstYearlyAveragePointsChart };
