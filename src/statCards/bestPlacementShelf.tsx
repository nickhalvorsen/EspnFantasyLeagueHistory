import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/reusableComponents/stringFormatters";

const BestPlacementShelf = () => {
  const data = useStore((s) => s.allData.teamStats).sort((a, b) => {
    const placementA = a.bestFinish;
    const placementB = b.bestFinish;
    return placementA - placementB;
  });

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
