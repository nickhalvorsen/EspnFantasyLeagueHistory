import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

type Props = {
  managerEspnId: string;
};

const PointDifferentialAgainstShelf = ({ managerEspnId }: Props) => {
  const teamStats = useStore((s) => s.allData.teamStats);

  const data = teamStats
    .find((teamStats) => teamStats.team.espnId === managerEspnId)
    ?.pointDifferentialByOpponent.map((matchup) => ({
      ...matchup,
      name:
        teamStats.find(
          (team) => team.team.espnId === matchup.opponentEspnId.toString()
        )?.team.managerName || "Unknown",
    }))
    .sort((a, b) => b.pointDifferential - a.pointDifferential);

  return (
    <Shelf>
      {data!.map((record) => (
        <ShelfRow key={record.opponentEspnId} label={"vs. " + record.name}>
          {record.pointDifferential >= 0 ? (
            <span className="text-green-500">
              +{record.pointDifferential.toFixed(2)}
            </span>
          ) : (
            <span className="text-red-500">
              {record.pointDifferential.toFixed(2)}
            </span>
          )}
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { PointDifferentialAgainstShelf };
