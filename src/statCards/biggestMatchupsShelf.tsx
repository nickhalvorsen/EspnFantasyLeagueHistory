import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";

const BiggestMatchupsShelf = () => {
  const allData = useStore();
  const biggestMatchups = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.biggestMatchups.map((matchup) => ({
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
    .sort((a, b) => b.total - a.total)
    // filter out duplicates
    .filter((x) => x.manager1score >= x.manager2score);

  const top10 = biggestMatchups.slice(0, 10);

  return (
    <Shelf>
      {top10.map((item, idx) => (
        <ShelfRow
          key={idx}
          label={
            <>
              {`${item.manager1Name} vs. ${item.manager2Name}`}{" "}
              <SubSubText className="sm:inline block">
                ({item.year} week {item.week})
              </SubSubText>
            </>
          }
        >
          {item.total.toFixed(2)} total pts
          <SubSubText className="sm:inline block">
            ({item.manager1score}–{item.manager2score})
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BiggestMatchupsShelf };
