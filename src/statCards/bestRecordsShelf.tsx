import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import { winLossTieString } from "@/reusableComponents/stringFormatters";
import New from "@/reusableComponents/new";

const BestRecordsShelf = () => {
  const allData = useStore();

  const allRecords = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.bestSeasonRecords.map((record) => ({
        manager: teamStats.team.managerName,
        ...record,
      }))
    )
    .sort((a, b) => b.wins - a.wins || a.losses - b.losses);

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

export { BestRecordsShelf };
