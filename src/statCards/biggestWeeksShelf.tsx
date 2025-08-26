import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import New from "@/reusableComponents/new";

const BiggestWeeksShelf = () => {
  const teamStats = useStore((store) => store.allData.teamStats);

  const allHighScores = teamStats
    .flatMap((teamStat) =>
      teamStat.highScores.map((score) => ({
        manager: teamStat.team.managerName,
        ...score,
      }))
    )
    .sort((a, b) => b.value - a.value);

  const top10 = allHighScores.slice(0, 10);

  return (
    <Shelf>
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {item.value}{" "}
          <SubSubText>
            ({item.year} week {item.week}) <New year={item.year} />
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BiggestWeeksShelf };
