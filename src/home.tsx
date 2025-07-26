import { WinLossChart } from "./statCards/winLossChart";
import { TrophyShelf } from "./statCards/trophyShelf";
import { useStore } from "./useData";
import { GarbageBinShelf } from "./statCards/garbageBinShelf";
import { AveragePointsChart } from "./statCards/averagePointsChart";
import { WinLossShelf } from "./statCards/winLossShelf";
import { BiggestWeeksShelf } from "./statCards/biggestWeeksShelf";

const Home = () => {
  const allData = useStore((state: any) => state.allData);
  console.log("allData", allData);
  return (
    <div>
      <h1 className="mb-4">XFL :POG: Fantasy Stats 2020&ndash;2024</h1>
      <div className="flex flex-wrap gap-4">
        <TrophyShelf />
        {/* <WinLossShelf /> */}
        {/* <WinLossChart /> */}
        {/* <AveragePointsChart /> */}
        {/* <BiggestWeeksShelf /> */}
        {/* <GarbageBinShelf /> */}
      </div>
    </div>
  );
};

export { Home };
