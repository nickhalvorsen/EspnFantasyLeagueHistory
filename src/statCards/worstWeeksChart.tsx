"use client";

import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const WorstWeeksChart = () => {
  let data = useStore((state) => state.allData.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: Number(
        teamStats.lowScores
          .sort((a, b) => a.value - b.value)[0]
          ?.value.toFixed(2)
      ),
    }))
    .sort((a, b) => a.value - b.value);

  return <HorizontalBarChart data={data} domainStart={0} domainEnd={150} />;
};

export { WorstWeeksChart };
