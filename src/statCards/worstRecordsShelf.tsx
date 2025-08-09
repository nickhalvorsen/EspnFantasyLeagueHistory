import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import { winLossTieString } from "@/reusableComponents/stringFormatters";
import New from "@/reusableComponents/new";

const WorstRecordsShelf = () => {
  const allData = useStore();

  const allRecords = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.worstSeasonRecords.map((record) => ({
        manager: teamStats.team.managerName,
        ...record,
      }))
    )
    .sort((a, b) => b.losses - a.losses || a.wins - b.wins || a.ties - b.ties);

  const top10 = allRecords.slice(0, 10);

  return (
    <Shelf>
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {winLossTieString(item.wins, item.losses, item.ties)}{" "}
          <SubSubText>
            ({item.year}) <New year={item.year} />
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WorstRecordsShelf };
