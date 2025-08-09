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
//import { BestYearlyAveragePointsChart } from "./statCards/bestYearlyAveragePointsChart";
//import { WorstYearlyAveragePointsChart } from "./statCards/worstYearlyAveragePointsChart";

const Home = () => {
  const leagueInfo = useStore((state: any) => state.leagueInfo);

  return (
    <div className="mb-2">
      <h1 className="mb-4">
        XFL :POG: Fantasy Stats {leagueInfo?.startYear}&ndash;
        {leagueInfo?.latestYear}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <StatCard title="Trophy shelf">
          <TrophyShelf />
        </StatCard>

        <StatCard
          title="Career win/loss"
          description="Regular season, all-time"
        >
          <WinLossShelf />
        </StatCard>

        <StatCard title="Playoff appearance %" description="All-time">
          <PlayoffPercentageShelf />
        </StatCard>

        <StatCard
          title="Average points per game"
          description="Regular season, all time"
        >
          <AveragePointsChart />
        </StatCard>

        <StatCard
          title="Best season records"
          description="Regular season, all-time"
        >
          <BestRecordsShelf />
        </StatCard>

        <StatCard
          title="Most wins in a season"
          description="Regular season, by manager"
        >
          <BestRecordsChart />
        </StatCard>

        <StatCard
          title="Worst season records"
          description="Regular season, all-time"
        >
          <WorstRecordsShelf />
        </StatCard>

        <StatCard
          title="Most losses in a season"
          description="Regular season, by manager"
        >
          <WorstRecordsChart />
        </StatCard>
        {/* 
        <StatCard
          title="Highest single-year average points"
          description="Regular season, by manager"
        >
          <BestYearlyAveragePointsChart />
        </StatCard>

        <StatCard
          title="Lowest single-year average points"
          description="Regular season, by manager"
        >
          <WorstYearlyAveragePointsChart />
        </StatCard> */}

        <StatCard title="Best career finish" description="By manager">
          <BestPlacementShelf />
        </StatCard>

        <StatCard title="Worst career finish" description="By manager">
          <WorstPlacementShelf />
        </StatCard>

        <StatCard title="Highest scoring weeks" description="All-time">
          <BiggestWeeksShelf />
        </StatCard>

        <StatCard title="Highest scoring week" description="By manager">
          <BiggestWeeksChart />
        </StatCard>

        <StatCard title="Lowest scoring weeks" description="All-time">
          <WorstWeeksShelf />
        </StatCard>

        <StatCard title="Lowest scoring week" description="By manager">
          <WorstWeeksChart />
        </StatCard>

        <StatCard title="Biggest blowouts" description="All-time">
          <BiggestBlowoutsShelf />
        </StatCard>

        <StatCard title="Closest matches" description="All-time">
          <ClosestMatchesShelf />
        </StatCard>

        <StatCard title="Highest-scoring matchups" description="All-time">
          <BiggestMatchupsShelf />
        </StatCard>

        <StatCard title="Lowest-scoring matchups" description="All-time">
          <LowestMatchupsShelf />
        </StatCard>

        <StatCard
          title="Longest win streak"
          description="Regular season, by manager"
        >
          <WinStreaksChart />
        </StatCard>

        <StatCard
          title="Longest loss streak"
          description="Regular season, by manager"
        >
          <LossStreaksChart />
        </StatCard>

        <StatCard title="Trade count" description="All-time, by manager">
          <TradeTotalsChart />
        </StatCard>

        <StatCard title="Garbage bin shelf">
          <GarbageBinShelf />
        </StatCard>
      </div>
    </div>
  );
};

export { Home };
