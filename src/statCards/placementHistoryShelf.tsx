import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { getOrdinal } from "@/utils/stringFormatters";
import { SubText } from "@/reusableComponents/subText";
type Props = {
  managerEspnId: string;
};

const PlacementHistoryShelf = ({ managerEspnId }: Props) => {
  const teamStats = useStore((s) => s.allData.teamStats);
  const data = teamStats.find(
    (teamStats) => teamStats.team.espnId === managerEspnId
  )?.placementHistory;

  const maxPlayerCount = useStore(
    (s) => s.allData.leagueInfo.maximumPlayerCount
  );

  const rows = [];
  if (maxPlayerCount) {
    for (let place = 1; place <= maxPlayerCount; place++) {
      const finishesInThisPlace = data?.filter((x) => x.place === place);
      const count = finishesInThisPlace?.length ?? 0;
      let emoji = "⚪️";
      if (place === 1) emoji = "🏆";
      rows.push(
        <ShelfRow key={place} label={getOrdinal(place)}>
          {count > 0 && (
            <>
              {emoji.repeat(count)}
              <SubText>
                ({finishesInThisPlace?.map((x) => x.year).join(", ")})
              </SubText>
            </>
          )}
        </ShelfRow>
      );
    }
  }
  return <Shelf>{rows}</Shelf>;
};

export { PlacementHistoryShelf };
