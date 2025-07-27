import { WinLossChart } from "./statCards/winLossChart";
import { TrophyShelf } from "./statCards/trophyShelf";
import { useStore } from "./useData";
import { GarbageBinShelf } from "./statCards/garbageBinShelf";
import { AveragePointsChart } from "./statCards/averagePointsChart";
import { WinLossShelf } from "./statCards/winLossShelf";
import { BiggestWeeksShelf } from "./statCards/biggestWeeksShelf";
import { WorstWeeksShelf } from "./statCards/worstWeeksShelf";

const Home = () => {
  const leagueInfo = useStore((state: any) => state.leagueInfo);
  return (
    <div className="mb-2">
      <h1 className="mb-4">
        XFL :POG: Fantasy Stats {leagueInfo?.startYear}&ndash;
        {leagueInfo?.latestYear}
      </h1>
      <div className="flex flex-wrap gap-4">
        <TrophyShelf />
        <WinLossShelf />
        {/* <WinLossChart /> */}
        <AveragePointsChart />
        <BiggestWeeksShelf />
        <WorstWeeksShelf />
        <GarbageBinShelf />
      </div>
    </div>
  );
};

export { Home };
