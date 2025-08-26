import { useStore } from "../data/useStore";
import { HorizontalBarChart } from "../reusableComponents/horizontalBarChart";

const WinStreaksChart = () => {
  const data = useStore((state) => state.allData.teamStats)
    .map((teamStats) => ({
      label: teamStats.team.managerName,
      value: teamStats.longestWinStreak,
    }))
    .sort((a, b) => b.value - a.value);
  const maxGames = useStore(
    (state) => state.allData.leagueInfo.regularSeasonMatchups
  );
  return (
    <HorizontalBarChart data={data} domainStart={0} domainEnd={maxGames} />
  );
};

export { WinStreaksChart };
