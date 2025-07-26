import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

const BiggestWeeksShelf = () => {
  const allData = useStore();

  const allHighScores = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.highScores.map((score) => ({
        manager: teamStats.team.managerName,
        ...score,
      }))
    )
    .sort((a, b) => b.value - a.value);

  const top10 = allHighScores.slice(0, 10);

  return (
    <Shelf title="Biggest Weeks">
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {item.value}{" "}
          <span className="text-xs text-gray-500 ml-2">
            ({item.year} week {item.week})
          </span>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BiggestWeeksShelf };
