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
import { PlayoffPercentageShelf } from "./statCards/playoffPercentageShelf";
import { WinStreaksChart } from "./statCards/winStreaksChart";
import { LossStreaksChart } from "./statCards/lossStreaksChart";
import { TradeTotalsChart } from "./statCards/tradeTotalsChart";
import { BiggestBlowoutsShelf } from "./statCards/biggestBlowoutsShelf";
import { ClosestMatchesShelf } from "./statCards/closestMatchesShelf";
import { BiggestMatchupsShelf } from "./statCards/biggestMatchupsShelf";
import { LowestMatchupsShelf } from "./statCards/lowestMatchupsShelf";
import { TrophyShelf2 } from "./statCards/trophyShelf2";

const Home = () => {
  const leagueInfo = useStore((state: any) => state.leagueInfo);
  return (
    <div className="mb-2">
      <h1 className="mb-4">
        XFL :POG: Fantasy Stats {leagueInfo?.startYear}&ndash;
        {leagueInfo?.latestYear}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* <TrophyShelf /> */}
        <TrophyShelf2 />
        <WinLossShelf />
        <PlayoffPercentageShelf />

        <Card>
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

        <Card>
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

        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Highest scoring weeks</h2>
            </CardTitle>
            <CardDescription>By manager</CardDescription>
          </CardHeader>
          <CardContent>
            <BiggestWeeksChart />
          </CardContent>
        </Card>

        <WorstWeeksShelf />

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Lowest scoring weeks</h2>
            </CardTitle>
            <CardDescription>By manager</CardDescription>
          </CardHeader>
          <CardContent>
            <WorstWeeksChart />
          </CardContent>
        </Card>

        <BiggestBlowoutsShelf />
        <ClosestMatchesShelf />

        <BiggestMatchupsShelf />
        <LowestMatchupsShelf />

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Longest win streaks</h2>
            </CardTitle>
            <CardDescription>Regular season, by manager</CardDescription>
          </CardHeader>
          <CardContent>
            <WinStreaksChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Longest loss streaks</h2>
            </CardTitle>
            <CardDescription>Regular season, by manager</CardDescription>
          </CardHeader>
          <CardContent>
            <LossStreaksChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Trade count</h2>
            </CardTitle>
            <CardDescription>All-time, by manager</CardDescription>
          </CardHeader>
          <CardContent>
            <TradeTotalsChart />
          </CardContent>
        </Card>

        <GarbageBinShelf />
      </div>
    </div>
  );
};

export { Home };
