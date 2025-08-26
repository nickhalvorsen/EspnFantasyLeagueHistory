import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import { winLossTieString } from "@/utils/stringFormatters";
import New from "@/reusableComponents/new";

const BestRecordsShelf = () => {
  const teamStats = useStore((state) => state.allData.teamStats);

  const allRecords = teamStats
    .flatMap((teamStat) =>
      teamStat.bestSeasonRecords.map((record) => ({
        manager: teamStat.team.managerName,
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
