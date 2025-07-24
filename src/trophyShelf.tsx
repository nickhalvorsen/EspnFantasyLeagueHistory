import { useStore } from "./useData";
import classes from "./trophyShelf.module.scss";

const TrophyShelf = () => {
  const allData = useStore();
  const data = allData.teams
    ?.map((team) => ({
      manager: team.managerName,
      trophies:
        allData.teamYears?.filter(
          (year) => year.finalRank === 1 && year.teamEspnId === team.espnId
        ).length || 0,
    }))
    .sort((a, b) => b.trophies - a.trophies);

  return (
    <div>
      <h2>Trophy Shelf</h2>
      <div>
        {data.map((item) => (
          <div key={item.manager}>
            <div className={classes.manager}>{item.manager}</div>:{" "}
            {"🏆".repeat(item.trophies)}
          </div>
        ))}
      </div>
    </div>
  );
};

export { TrophyShelf };
