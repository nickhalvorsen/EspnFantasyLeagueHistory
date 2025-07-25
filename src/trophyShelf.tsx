import { useStore } from "./useData";
import classes from "./trophyShelf.module.scss";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { TrophyCount } from "./trophyCount";

const TrophyShelf = () => {
  const allData = useStore();
  // Group managers by number of trophies
  const data =
    allData.teams?.map((team) => ({
      manager: team.managerName,
      trophies: team.trophies,
    })) || [];

  const grouped = Object.groupBy(data, (item) => item.trophies);
  const sortedTrophyCounts = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .filter((count) => count > 0);

  return (
    <Card className="mb-4">
      <CardHeader>
        <h2>Trophy Shelf</h2>
      </CardHeader>
      <CardContent>
        {sortedTrophyCounts.map((trophyCount) => (
          <div key={trophyCount} style={{ marginBottom: "1em" }}>
            {grouped[trophyCount].map((item) => (
              <span
                key={item.manager}
                style={{ marginLeft: 12, marginRight: 12 }}
              >
                {item.manager} &nbsp;
                <span className={classes.trophyCount}>
                  <TrophyCount numTrophies={item?.trophies} />
                </span>
              </span>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { TrophyShelf };
