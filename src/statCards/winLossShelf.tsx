import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

const WinLossLabel = (wins: number, losses: number, ties: number) =>
  ties > 0 ? `${wins}–${losses}–${ties}` : `${wins}–${losses}`;

const WinLossShelf = () => {
  const allData = useStore((s) => s.teamStats).sort((a, b) => {
    const diffA = a.winLossRecord.wins - a.winLossRecord.losses;
    const diffB = b.winLossRecord.wins - b.winLossRecord.losses;
    return diffB - diffA;
  });

  return (
    <Shelf title="Career Win/Loss">
      {allData.map((teamStats) => (
        <ShelfRow
          key={teamStats.team.espnId}
          label={teamStats.team.managerName}
        >
          {WinLossLabel(
            teamStats.winLossRecord.wins,
            teamStats.winLossRecord.losses,
            teamStats.winLossRecord.ties
          )}
          &nbsp;(
          {Math.round(
            (teamStats.winLossRecord.wins /
              (teamStats.winLossRecord.wins +
                teamStats.winLossRecord.losses +
                teamStats.winLossRecord.ties)) *
              100
          )}
          %)
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WinLossShelf };
