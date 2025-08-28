import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

const PlayoffPercentageShelf = () => {
  const data = useStore((s) => s.allData.teamStats).sort(
    (a, b) => b.playoffPercentage - a.playoffPercentage
  );

  return (
    <Shelf>
      {data.map((teamStats) => (
        <ShelfRow
          key={teamStats.team.espnId}
          label={teamStats.team.managerName}
        >
          {teamStats.playoffPercentage.toFixed(0)}%
          <SubSubText>
            &nbsp;(
            {teamStats.numPlayoffAppearances}/{teamStats.yearsPlayed})
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { PlayoffPercentageShelf };
