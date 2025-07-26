import { useStore } from "../useData";
import classes from "./trophyShelf.module.scss";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

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
      const binYears = (allData.teamYears || [])
        .filter(
          (year) =>
            year.teamEspnId === team.espnId &&
            year.playoffSeed === yearToMaxRank[year.year]
        )
        .map((year) => year.year);
      return {
        manager: team.managerName,
        bins: binYears.length,
        binYears,
      };
    }) || [];

  const sortedData = data.sort((a, b) => a.bins - b.bins);

  return (
    <Shelf title="Garbage Bin Shelf">
      {sortedData.map((item) => (
        <ShelfRow key={item.manager} label={item.manager}>
          <span className={classes.trophyCount}>
            &nbsp;{"🗑️".repeat(item.bins)}
          </span>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { GarbageBinShelf };
