import { useStore } from "./useData";
import classes from "./trophyShelf.module.scss";
import { Card, CardContent, CardHeader } from "./components/ui/card";

const GarbageBinShelf = () => {
  const allData = useStore();

  // Calculate bins: number of years a team came in last place
  // 1. Find the max finalRank for each year
  const yearToMaxRank = (allData.teamYears || []).reduce((acc, year) => {
    if (!acc[year.year] || year.finalRank > acc[year.year]) {
      acc[year.year] = year.finalRank;
    }
    return acc;
  }, {} as Record<number, number>);

  console.log(yearToMaxRank, "yearToMaxRank");

  // 2. For each team, count how many times their teamYear has finalRank equal to that year's max
  const data =
    allData.teams?.map((team) => {
      const bins = (allData.teamYears || []).filter(
        (year) =>
          year.teamEspnId === team.espnId &&
          year.playoffSeed === yearToMaxRank[year.year]
      ).length;
      return {
        manager: team.managerName,
        bins,
      };
    }) || [];

  const sortedData = data.sort((a, b) => a.bins - b.bins);

  return (
    <Card className="mb-4">
      <CardHeader>
        <h2>Garbage Bin Shelf</h2>
      </CardHeader>
      <CardContent>
        {sortedData.map((item) => (
          <div key={item.manager} style={{ marginBottom: "1em" }}>
            <span style={{ minWidth: 65, display: "inline-block" }}>
              {item.manager}
            </span>
            <span className={classes.trophyCount}>
              &nbsp;{"🗑️".repeat(item.bins)}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { GarbageBinShelf };
