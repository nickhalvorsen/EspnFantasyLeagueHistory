import { useParams } from "react-router-dom";
import { StatCardSmall } from "./reusableComponents/statCardSmall";
import { TrophyCount } from "./reusableComponents/trophyCount";
import { winLossTieString } from "./reusableComponents/stringFormatters";
import { PlayoffWinLossAgainstShelf } from "./statCards/playoffWinLossAgainstShelf";
import { WinLossAgainstShelf } from "./statCards/winLossAgainstShelf";
import { useStore } from "./useData";
import { PlacementHistoryShelf } from "./statCards/placementHistoryShelf";
import { StatCard } from "./reusableComponents/statCard";
import { PointDifferentialAgainstShelf } from "./statCards/pointDifferentialAgainstShelf";
import { ManagerBiggestWeeksShelf } from "./statCards/managerBiggestWeeksShelf";

const ManagerStats = () => {
  const manager = useParams().manager!;
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
        <span className="capitalize">{manager}</span>'s stats
        <TrophyCount numTrophies={stats.trophies} />
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 ">
        <StatCardSmall
          name="Career win/loss (reg. season)"
          value={winLossTieString(
            stats.winLossRecord.wins,
            stats.winLossRecord.losses,
            stats.winLossRecord.ties
          )}
        />
        <StatCardSmall
          name="Average points per game (reg. season)"
          value={stats.averagePointsPerGame.toFixed(2)}
        />
        <StatCardSmall
          name="Playoff appearance %"
          value={`${stats.playoffPercentage.toFixed(0)}% (${
            stats.numPlayoffAppearances
          }/${stats.yearsPlayed})`}
        />
        <StatCardSmall
          name="Career points (reg. season)"
          value={stats.lifetimePointsFor.toFixed(2)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <StatCard title="Career placements" description="">
          <PlacementHistoryShelf managerEspnId={stats.team.espnId} />
        </StatCard>

        <StatCard
          title="Highest-scoring weeks"
          description="Regular season, all-time"
        >
          <ManagerBiggestWeeksShelf managerEspnId={stats.team.espnId} />
        </StatCard>
        <StatCard
          title="Win/loss vs. manager"
          description="Regular season, all-time"
        >
          <WinLossAgainstShelf managerEspnId={stats.team.espnId} />
        </StatCard>

        <StatCard
          title="Playoff win/loss vs. manager"
          description="Winner's bracket, all-time, excluding consolation matches"
        >
          <PlayoffWinLossAgainstShelf managerEspnId={stats.team.espnId} />
        </StatCard>

        <StatCard
          title="Point differential vs. manager"
          description="Regular season, all-time"
        >
          <PointDifferentialAgainstShelf managerEspnId={stats.team.espnId} />
        </StatCard>
      </div>
    </div>
  );
};

export default ManagerStats;
