import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
type Props = {
  managerEspnId: string;
};

const CurrentStreakAgainstShelf = ({ managerEspnId }: Props) => {
  const teamStats = useStore((s) => s.teamStats);
  const data = teamStats
    .find((teamStats) => teamStats.team.espnId === managerEspnId)
    ?.currentStreakByOpponent.map((record) => ({
      ...record,
      name:
        teamStats.find(
          (team) => team.team.espnId === record.opponentEspnId.toString()
        )?.team.managerName || "Unknown",
    }))
    .sort(
      (a, b) =>
        (b.result === "WIN" ? b.streak : -b.streak) -
        (a.result === "WIN" ? a.streak : -a.streak)
    );

  return (
    <Shelf>
      {data!.map((record) => (
        <ShelfRow key={record.opponentEspnId} label={"vs. " + record.name}>
          <span
            className={
              record.result === "WIN"
                ? "text-green-500"
                : record.result === "LOSS"
                ? "text-red-500"
                : ""
            }
          >
            {record.result?.charAt(0)}-{Math.abs(record.streak)}
          </span>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { CurrentStreakAgainstShelf };
