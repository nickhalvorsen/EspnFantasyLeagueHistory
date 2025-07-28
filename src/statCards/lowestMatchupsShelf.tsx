import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

const LowestMatchupsShelf = () => {
  const allData = useStore();
  const lowestMatchups = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.lowestMatchups.map((matchup) => ({
        ...matchup,
        manager1Name: allData.teams.find(
          (team) => team.espnId === matchup.manager1
        )?.managerName,
        manager2Name: allData.teams.find(
          (team) => team.espnId === matchup.manager2
        )?.managerName,
        total: matchup.manager1score + matchup.manager2score,
      }))
    )
    .sort((a, b) => a.total - b.total)
    // filter out duplicates
    .filter((x) => x.manager1score >= x.manager2score);

  const top10 = lowestMatchups.slice(0, 10);

  return (
    <Shelf title="Lowest-scoring matchups" description="All-time">
      {top10.map((item, idx) => (
        <ShelfRow
          key={idx}
          label={`${item.manager1Name} vs. ${item.manager2Name}`}
        >
          {item.total.toFixed(2)} total pts
          <SubSubText>
            ({item.manager1score}–{item.manager2score})
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { LowestMatchupsShelf };
