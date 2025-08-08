import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

const PlayoffPercentageShelf = () => {
  const allData = useStore((s) => s.teamStats).sort((a, b) => {
    const playoffA = a.playoffPercentage;
    const playoffB = b.playoffPercentage;
    return playoffB - playoffA;
  });

  return (
    <Shelf>
      {allData.map((teamStats) => (
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
