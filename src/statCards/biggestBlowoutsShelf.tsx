import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

const BiggestBlowoutsShelf = () => {
  const allData = useStore();
  const biggestBlowouts = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.biggestBlowouts.map((blowout) => ({
        ...blowout,
        manager1Name: allData.teams.find(
          (team) => team.espnId === blowout.manager1
        )?.managerName,
        manager2Name: allData.teams.find(
          (team) => team.espnId === blowout.manager2
        )?.managerName,
        differential: blowout.manager1score - blowout.manager2score,
      }))
    )
    .sort((a, b) => b.differential - a.differential);

  const top10 = biggestBlowouts.slice(0, 10);

  return (
    <Shelf title="Biggest blowouts" description="All-time">
      {top10.map((item, idx) => (
        <ShelfRow
          key={idx}
          label={`${item.manager1Name} vs. ${item.manager2Name}`}
        >
          {item.manager1score}–{item.manager2score}
          <SubSubText>
            ({item.differential.toFixed(2)} pts margin) ({item.year} week{" "}
            {item.week})
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BiggestBlowoutsShelf };
