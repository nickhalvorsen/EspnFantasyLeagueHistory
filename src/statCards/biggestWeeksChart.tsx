"use client";

import { useStore } from "../useData";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const BiggestWeeksChart = () => {
  let data = useStore((state) => state.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: Number(
        teamStats.highScores
          .sort((a, b) => b.value - a.value)[0]
          ?.value.toFixed(2)
      ),
    }))
    .sort((a, b) => b.value - a.value);

  const maxValue = Math.max(...data.map((d) => d.value));
  const domainMax = Math.ceil((maxValue + 20) / 10) * 10;

  return (
    <HorizontalBarChart data={data} domainStart={100} domainEnd={domainMax} />
  );
};

export { BiggestWeeksChart };
