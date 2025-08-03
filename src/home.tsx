import { useStore } from "./useData";
import { GarbageBinShelf } from "./statCards/garbageBinShelf";
import { AveragePointsChart } from "./statCards/averagePointsChart";
import { WinLossShelf } from "./statCards/winLossShelf";
import { BiggestWeeksShelf } from "./statCards/biggestWeeksShelf";
import { WorstWeeksShelf } from "./statCards/worstWeeksShelf";
import { BiggestWeeksChart } from "./statCards/biggestWeeksChart";
import { WorstWeeksChart } from "./statCards/worstWeeksChart";
import { BestRecordsShelf } from "./statCards/bestRecordsShelf";
import { BestRecordsChart } from "./statCards/bestRecordsChart";
import { WorstRecordsChart } from "./statCards/worstRecordsChart";
import { WorstRecordsShelf } from "./statCards/worstRecordsShelf";
import { PlayoffPercentageShelf } from "./statCards/playoffPercentageShelf";
import { WinStreaksChart } from "./statCards/winStreaksChart";
import { LossStreaksChart } from "./statCards/lossStreaksChart";
import { TradeTotalsChart } from "./statCards/tradeTotalsChart";
import { BiggestBlowoutsShelf } from "./statCards/biggestBlowoutsShelf";
import { ClosestMatchesShelf } from "./statCards/closestMatchesShelf";
import { BiggestMatchupsShelf } from "./statCards/biggestMatchupsShelf";
import { LowestMatchupsShelf } from "./statCards/lowestMatchupsShelf";
import { TrophyShelf } from "./statCards/trophyShelf";
import { BestPlacementShelf } from "./statCards/bestPlacementShelf";
import { WorstPlacementShelf } from "./statCards/worstPlacementShelf";
import { StatCard } from "./reusableComponents/statCard";

const Home = () => {
  const leagueInfo = useStore((state: any) => state.leagueInfo);

  return (
    <div className="mb-2">
      <h1 className="mb-4">
        XFL :POG: Fantasy Stats {leagueInfo?.startYear}&ndash;
        {leagueInfo?.latestYear}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <TrophyShelf />
        <WinLossShelf />
        <PlayoffPercentageShelf />

        <StatCard
          title="Average points per game"
          description="Regular season, all time"
        >
          <AveragePointsChart />
        </StatCard>

        <BestRecordsShelf />

        <StatCard
          title="Most wins in a season"
          description="Regular season, by manager"
        >
          <BestRecordsChart />
        </StatCard>

        <WorstRecordsShelf />

        <StatCard
          title="Most losses in a season"
          description="Regular season, by manager"
        >
          <WorstRecordsChart />
        </StatCard>

        <BestPlacementShelf />
        <WorstPlacementShelf />

        <BiggestWeeksShelf />

        <StatCard title="Highest scoring week" description="By manager">
          <BiggestWeeksChart />
        </StatCard>

        <WorstWeeksShelf />

        <StatCard title="Lowest scoring week" description="By manager">
          <WorstWeeksChart />
        </StatCard>

        <BiggestBlowoutsShelf />
        <ClosestMatchesShelf />

        <BiggestMatchupsShelf />
        <LowestMatchupsShelf />

        <StatCard
          title="Longest win streaks"
          description="Regular season, by manager"
        >
          <WinStreaksChart />
        </StatCard>

        <StatCard
          title="Longest loss streaks"
          description="Regular season, by manager"
        >
          <LossStreaksChart />
        </StatCard>

        <StatCard title="Trade count" description="All-time, by manager">
          <TradeTotalsChart />
        </StatCard>

        <GarbageBinShelf />
      </div>
    </div>
  );
};

export { Home };
