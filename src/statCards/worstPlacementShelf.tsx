import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/utils/stringFormatters";

const WorstPlacementShelf = () => {
  const data = useStore((s) => s.allData.teamStats).sort((a, b) => {
    return a.worstFinish - b.worstFinish;
  });

  return (
    <Shelf>
      {data.map((teamStats) => (
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
