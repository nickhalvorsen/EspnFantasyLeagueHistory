import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import { winLossTieString } from "@/reusableComponents/winLossTieString";

const BestRecordsShelf = () => {
  const allData = useStore();

  const allRecords = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.bestSeasonRecords.map((record) => ({
        manager: teamStats.team.managerName,
        ...record,
      }))
    )
    .sort((a, b) => b.wins - a.wins);

  const top10 = allRecords.slice(0, 10);

  return (
    <Shelf title="Best Season Records" description="Regular season, all-time">
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {winLossTieString(item.wins, item.losses, item.ties)}{" "}
          <SubSubText>({item.year})</SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BestRecordsShelf };
