import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { winLossTieString } from "@/reusableComponents/winLossTieString";
import { SubSubText } from "@/reusableComponents/subSubText";

type Props = {
  managerEspnId: string;
};

const WinLossAgainstShelf = ({ managerEspnId }: Props) => {
  const teamStats = useStore((s) => s.teamStats);
  const data = teamStats
    .find((teamStats) => teamStats.team.espnId === managerEspnId)
    ?.winLossRecordAgainst.map((record) => ({
      ...record,
      winrate: Math.round(
        (record.wins / (record.wins + record.losses + record.ties)) * 100
      ),
      name:
        teamStats.find(
          (team) => team.team.espnId === record.opponentEspnId.toString()
        )?.team.managerName || "Unknown",
    }))
    .sort((a, b) => b.winrate - a.winrate);

  return (
    <Shelf title="Win/loss vs. manager" description="Regular season, all-time">
      {data!.map((record) => (
        <ShelfRow key={record.opponentEspnId} label={"vs. " + record.name}>
          {winLossTieString(record.wins, record.losses, record.ties)}

          <SubSubText>
            &nbsp;(
            {record.winrate}
            %)
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { WinLossAgainstShelf };
