import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/reusableComponents/stringFormatters";

const WorstPlacementShelf = () => {
  const allData = useStore((s) => s.teamStats).sort((a, b) => {
    return a.worstFinish - b.worstFinish;
  });

  return (
    <Shelf>
      {allData.map((teamStats) => (
        <ShelfRow
          key={teamStats.team.espnId}
          label={teamStats.team.managerName}
        >
          {getOrdinal(teamStats.worstFinish)} place
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WorstPlacementShelf };
