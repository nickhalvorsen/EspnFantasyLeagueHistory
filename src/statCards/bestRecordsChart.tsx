import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const BestRecordsChart = () => {
  let data = useStore((state) => state.allData.teamStats)
    .map((teamStat) => ({
      label: teamStat.team.managerName,
      value: teamStat.bestSeasonRecords.sort((a, b) => b.wins - a.wins)[0]
        ?.wins,
    }))
    .sort((a, b) => b.value - a.value);
  let maxGames = useStore(
    (state) => state.allData.leagueInfo.regularSeasonMatchups
  );
  return (
    <HorizontalBarChart data={data} domainStart={0} domainEnd={maxGames} />
  );
};

export { BestRecordsChart };
