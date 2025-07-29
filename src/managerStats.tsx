import { StatCard } from "./reusableComponents/statCard";
import { TrophyCount } from "./reusableComponents/trophyCount";
import { winLossTieString } from "./reusableComponents/winLossTieString";
import { PlayoffWinLossAgainstShelf } from "./statCards/playoffWinLossAgainstShelf";
import { WinLossAgainstShelf } from "./statCards/winLossAgainstShelf";
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

  return (
    <div>
      <h1>
        <span className="capitalize">{manager}</span>'s fantasy stats
        <TrophyCount numTrophies={stats.trophies} />
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 ">
        <StatCard
          name="Win/Loss (reg. season)"
          value={winLossTieString(
            stats.winLossRecord.wins,
            stats.winLossRecord.losses,
            stats.winLossRecord.ties
          )}
        />
        <StatCard
          name="Average points per game (reg. season)"
          value={stats.averagePointsPerGame.toFixed(2)}
        />
        <StatCard
          name="Playoff appearance %"
          value={`${stats.playoffPercentage.toFixed(0)}% (${
            stats.numPlayoffAppearances
          }/${stats.yearsPlayed})`}
        />
        <StatCard
          name="Career points (reg. season)"
          value={stats.lifetimePointsFor.toFixed(2)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <WinLossAgainstShelf managerEspnId={stats.team.espnId} />
        <PlayoffWinLossAgainstShelf managerEspnId={stats.team.espnId} />
        {/* <PlacementHistoryShelf managerEspnId={stats.team.espnId} /> */}
      </div>
    </div>
  );
};

export default ManagerStats;
