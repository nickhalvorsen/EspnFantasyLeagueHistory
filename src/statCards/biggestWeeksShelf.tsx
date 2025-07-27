import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

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
    <Shelf title="Biggest weeks" description="All-time">
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {item.value}{" "}
          <SubSubText>
            ({item.year} week {item.week})
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BiggestWeeksShelf };
