import { useStore } from "../useData";
import classes from "./trophyShelf.module.scss";
import { TrophyCount } from "../reusableComponents/trophyCount";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

const TrophyShelf = () => {
  const allData = useStore();
  // Group managers by number of trophies
  const data =
    allData.teams?.map((team) => {
      const firstPlaceYears = (allData.teamYears || [])
        .filter(
          (year) => year.finalRank === 1 && year.teamEspnId === team.espnId
        )
        .map((year) => year.year);
      return {
        manager: team.managerName,
        trophies: team.trophies,
        firstPlaceYears,
      };
    }) || [];

  const grouped = Object.groupBy(data, (item) => item.trophies);
  const sortedTrophyCounts = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .filter((count) => count > 0);

  return (
    <Shelf title="Trophy Shelf">
      {sortedTrophyCounts.map((trophyCount) => (
        <ShelfRow key={trophyCount}>
          {grouped[trophyCount].map((item) => (
            <span
              key={item.manager}
              style={{ marginLeft: 12, marginRight: 12, marginTop: -5 }}
              className="whitespace-nowrap"
            >
              {item.manager}&nbsp;
              <span className={classes.trophyCount}>
                <TrophyCount numTrophies={item?.trophies} />
              </span>
              {item.firstPlaceYears && item.firstPlaceYears.length > 0 && (
                <span
                  style={{ marginLeft: 6, fontSize: "0.9em", color: "#888" }}
                >
                  ({item.firstPlaceYears.join(", ")})
                </span>
              )}
            </span>
          ))}
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { TrophyShelf };
