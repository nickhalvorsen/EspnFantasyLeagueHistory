import { StatCard } from "./reusableComponents/statCard";
import { TrophyCount } from "./reusableComponents/trophyCount";
import { winLossTieString } from "./reusableComponents/winLossTieString";
import { WinLossAgainstShelf } from "./statCards/winLossAgainstShelf";
import { useAveragePointsData } from "./useAveragePointsData";
import { useStore } from "./useData";

interface ManagerStatsProps {
  manager: string;
}

const ManagerStats = ({ manager }: ManagerStatsProps) => {
  const stats = useStore((s) =>
    s.teamStats.find(
      (team) => team.team.managerName.toLowerCase() === manager.toLowerCase()
    )
  );
  if (!stats) {
    return <div>No stats found for {manager}</div>;
  }
  // const allData;
  // const managerData = allData.teams?.find(
  //   (team) => team.managerName.toLowerCase() === manager.toLowerCase()
  // );
  // const years = allData.teamYears?.filter(
  //   (year) => year.teamEspnId === managerData?.espnId
  // );
  // const wins = years?.reduce((acc, year) => acc + year.wins, 0) || 0;
  // const losses = years?.reduce((acc, year) => acc + year.losses, 0) || 0;
  // const ties = years?.reduce((acc, year) => acc + year.ties, 0) || 0;

  // const averageFinish = years
  //   ? (
  //       years.reduce((acc, year) => acc + year.finalRank, 0) / years.length
  //     ).toFixed(2)
  //   : 0;

  // // playoff percentage is the percentage of years the playoff seed is 4 or less
  // const playoffYears =
  //   years?.filter((year) => year.playoffSeed <= 4).length || 0;
  // const playoffPercentage = years ? (playoffYears / years.length) * 100 : 0;

  // const averagePointsData = useAveragePointsData();
  // const averagePoints = averagePointsData?.find(
  //   (data) => data.teamEspnId === managerData?.espnId
  // )?.averagePoints;

  return (
    <div>
      <h1>
        <span className="capitalize">{manager}</span>'s fantasy stats
        <TrophyCount numTrophies={stats.trophies} />
      </h1>

      {/* these classes copied from shadcn demo, I have no clue what they all mean */}
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <StatCard
              name="Win/Loss"
              value={winLossTieString(
                stats.winLossRecord.wins,
                stats.winLossRecord.losses,
                stats.winLossRecord.ties
              )}
            />
            <StatCard
              name="Average points per game"
              value={stats.averagePointsPerGame.toFixed(2)}
            />
            <StatCard name="Average finish" value={"TODO"} />
            <StatCard
              name="Playoff %"
              value={`${stats.playoffPercentage.toFixed(0)}% (${
                stats.numPlayoffAppearances
              }/${stats.yearsPlayed})`}
            />
          </div>
        </div>
      </div>
      <div>
        <WinLossAgainstShelf managerEspnId={stats.team.espnId} />
      </div>
    </div>
  );
};

export default ManagerStats;
