import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/reusableComponents/stringFormatters";

const BestPlacementShelf = () => {
  const allData = useStore((s) => s.teamStats).sort((a, b) => {
    const placementA = a.bestFinish;
    const placementB = b.bestFinish;
    return placementA - placementB;
  });

  return (
    <Shelf title="Best career finish" description="By manager">
      {allData.map((teamStats) => (
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
