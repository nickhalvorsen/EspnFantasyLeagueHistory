import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import New from "@/reusableComponents/new";

const WorstWeeksShelf = () => {
  const teamStats = useStore((state) => state.allData.teamStats);

  const allLowScores = teamStats
    .flatMap((teamStats) =>
      teamStats.lowScores.map((score) => ({
        manager: teamStats.team.managerName,
        ...score,
      }))
    )
    .sort((a, b) => a.value - b.value);

  const top10 = allLowScores.slice(0, 10);

  return (
    <Shelf>
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {item.value}
          <SubSubText>
            ({item.year} week {item.week}) <New year={item.year} />
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WorstWeeksShelf };
