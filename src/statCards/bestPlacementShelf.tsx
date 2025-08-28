import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/utils/stringFormatters";

const BestPlacementShelf = () => {
  const data = useStore((s) => s.allData.teamStats).sort(
    (a, b) => a.bestFinish - b.bestFinish
  );

  return (
    <Shelf>
      {data.map((teamStats) => (
        <ShelfRow
          key={teamStats.team.espnId}
          label={teamStats.team.managerName}
        >
          {getOrdinal(teamStats.bestFinish)} place
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BestPlacementShelf };
