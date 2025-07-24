import { ChartBarHorizontalTest } from "./barChartHorizontal";
import { TrophyShelf } from "./trophyShelf";
import { useLoadData, useStore } from "./useData";

const Home = () => {
  const allData = useStore((state: any) => state.allData);
  useLoadData();
  console.log("allData", allData);
  return (
    <div>
      <h1>XFL League stats</h1>
      <TrophyShelf />
      <ChartBarHorizontalTest />
    </div>
  );
};

export { Home };
