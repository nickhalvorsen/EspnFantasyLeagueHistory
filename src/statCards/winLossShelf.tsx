import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { winLossTieString } from "@/reusableComponents/stringFormatters";
import { SubSubText } from "@/reusableComponents/subSubText";

const WinLossShelf = () => {
  const allData = useStore((s) => s.teamStats).sort((a, b) => {
    const diffA = a.winLossRecord.wins - a.winLossRecord.losses;
    const diffB = b.winLossRecord.wins - b.winLossRecord.losses;
    return diffB - diffA;
  });

  return (
    <Shelf title="Career win/loss" description="Regular season, all-time">
      {allData.map((teamStats) => (
        <ShelfRow
          key={teamStats.team.espnId}
          label={teamStats.team.managerName}
        >
          {winLossTieString(
            teamStats.winLossRecord.wins,
            teamStats.winLossRecord.losses,
            teamStats.winLossRecord.ties
          )}

          <SubSubText>
            &nbsp;(
            {Math.round(
              (teamStats.winLossRecord.wins /
                (teamStats.winLossRecord.wins +
                  teamStats.winLossRecord.losses +
                  teamStats.winLossRecord.ties)) *
                100
            )}
            %)
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WinLossShelf };
