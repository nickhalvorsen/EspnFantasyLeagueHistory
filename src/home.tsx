import { TrophyShelf } from "./statCards/trophyShelf";
import { useStore } from "./useData";
import { GarbageBinShelf } from "./statCards/garbageBinShelf";
import { AveragePointsChart } from "./statCards/averagePointsChart";
import { WinLossShelf } from "./statCards/winLossShelf";
import { BiggestWeeksShelf } from "./statCards/biggestWeeksShelf";
import { WorstWeeksShelf } from "./statCards/worstWeeksShelf";
import { BiggestWeeksChart } from "./statCards/biggestWeeksChart";
import { WorstWeeksChart } from "./statCards/worstWeeksChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { BestRecordsShelf } from "./statCards/bestRecordsShelf";
import { BestRecordsChart } from "./statCards/bestRecordsChart";
import { WorstRecordsChart } from "./statCards/worstRecordsChart";
import { WorstRecordsShelf } from "./statCards/worstRecordsShelf";

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

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>
              <h2>Average points per game</h2>
            </CardTitle>
            <CardDescription>All-time</CardDescription>
          </CardHeader>
          <CardContent>
            <AveragePointsChart />
          </CardContent>
        </Card>

        <BestRecordsShelf />

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>
              <h2>Most wins in a season</h2>
            </CardTitle>
            <CardDescription>Regular season, by manager</CardDescription>
          </CardHeader>
          <CardContent>
            <BestRecordsChart />
          </CardContent>
        </Card>

        <WorstRecordsShelf />

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>
              <h2>Most losses in a season</h2>
            </CardTitle>
            <CardDescription>Regular season, by manager</CardDescription>
          </CardHeader>
          <CardContent>
            <WorstRecordsChart />
          </CardContent>
        </Card>

        <BiggestWeeksShelf />

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>
              <h2>Biggest weeks</h2>
            </CardTitle>
            <CardDescription>By manager</CardDescription>
          </CardHeader>
          <CardContent>
            <BiggestWeeksChart />
          </CardContent>
        </Card>

        <WorstWeeksShelf />

        <Card className="w-full md:w-1/2">
          <CardHeader>
            <CardTitle>
              <h2>Worst weeks</h2>
            </CardTitle>
            <CardDescription>By manager</CardDescription>
          </CardHeader>
          <CardContent>
            <WorstWeeksChart />
          </CardContent>
        </Card>

        <GarbageBinShelf />
      </div>
    </div>
  );
};

export { Home };
