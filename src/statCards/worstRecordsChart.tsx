import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const WorstRecordsChart = () => {
  let data = useStore((state) => state.allData.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: teamStats.worstSeasonRecords.sort((a, b) => b.losses - a.losses)[0]
        ?.losses,
    }))
    .sort((a, b) => b.value - a.value);
  let maxGames = useStore(
    (state) => state.allData.leagueInfo.regularSeasonMatchups
  );
  return (
    <HorizontalBarChart data={data} domainStart={0} domainEnd={maxGames} />
  );
};

export { WorstRecordsChart };
