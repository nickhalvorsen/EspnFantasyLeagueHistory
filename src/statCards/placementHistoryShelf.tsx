import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/reusableComponents/stringFormatters";
type Props = {
  managerEspnId: string;
};

const PlacementHistoryShelf = ({ managerEspnId }: Props) => {
  const teamStats = useStore((s) => s.teamStats);
  const data = teamStats.find(
    (teamStats) => teamStats.team.espnId === managerEspnId
  )?.placementHistory;

  const maxPlayerCount = useStore((s) => s.leagueInfo.maximumPlayerCount);

  const rows = [];
  if (maxPlayerCount) {
    for (let place = 1; place <= maxPlayerCount; place++) {
      const count = data?.[place] ?? 0;
      rows.push(
        <ShelfRow key={place} label={getOrdinal(place)}>
          {"⚪️".repeat(count)}
        </ShelfRow>
      );
    }
  }
  return (
    <Shelf title="Career placements" description="">
      {rows}
    </Shelf>
  );
};

export { PlacementHistoryShelf };
