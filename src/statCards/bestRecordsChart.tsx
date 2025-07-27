import { useStore } from "../useData";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const BestRecordsChart = () => {
  let data = useStore((state) => state.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: teamStats.bestSeasonRecords.sort((a, b) => b.wins - a.wins)[0]
        ?.wins,
    }))
    .sort((a, b) => b.value - a.value);
  let maxGames = useStore((state) => state.leagueInfo.regularSeasonMatchups);
  return (
    <HorizontalBarChart data={data} domainStart={0} domainEnd={maxGames} />
  );
};

export { BestRecordsChart };
