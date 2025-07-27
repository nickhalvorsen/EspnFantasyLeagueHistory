import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

const WorstWeeksShelf = () => {
  const allData = useStore();

  const allLowScores = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.lowScores.map((score) => ({
        manager: teamStats.team.managerName,
        ...score,
      }))
    )
    .sort((a, b) => a.value - b.value);

  const top10 = allLowScores.slice(0, 10);

  return (
    <Shelf title="Disastrous Weeks">
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {item.value}
          <SubSubText>
            ({item.year} week {item.week})
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WorstWeeksShelf };
