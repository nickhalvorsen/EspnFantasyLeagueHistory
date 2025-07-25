import { SimpleBarChart, WinLossChart } from "./winLossChart";
import { TrophyShelf } from "./trophyShelf";
import { useLoadData, useStore } from "./useData";
import { GarbageBinShelf } from "./garbageBinShelf";

const Home = () => {
  const allData = useStore((state: any) => state.allData);
  console.log("allData", allData);
  return (
    <div>
      <h1 className="mb-4">XFL :POG: Fantasy Stats 2020&ndash;2024</h1>
      <TrophyShelf />
      <WinLossChart />
      <hr />
      ggg
      <SimpleBarChart />
      ggg
      <hr />
      <GarbageBinShelf />
    </div>
  );
};

export { Home };
