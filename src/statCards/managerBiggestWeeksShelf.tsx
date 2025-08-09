import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import New from "@/reusableComponents/new";

type Props = {
  managerEspnId: string;
};

const ManagerBiggestWeeksShelf = ({ managerEspnId }: Props) => {
  const teamStats = useStore((s) => s.teamStats);

  const data = teamStats
    .find((teamStats) => teamStats.team.espnId === managerEspnId)
    ?.highScores.sort((a, b) => b.value - a.value);

  const top10 = data!.slice(0, 10);

  return (
    <Shelf>
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={""}>
          {item.value}{" "}
          <SubSubText>
            ({item.year} week {item.week}) <New year={item.year} />
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { ManagerBiggestWeeksShelf };
