import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import New from "@/reusableComponents/new";

const LowestMatchupsShelf = () => {
  const store = useStore();
  const lowestMatchups = store.allData.teamStats
    .flatMap((teamStats) =>
      teamStats.lowestMatchups.map((matchup) => ({
        ...matchup,
        manager1Name: store.allData.teams.find(
          (team) => team.espnId === matchup.manager1
        )?.managerName,
        manager2Name: store.allData.teams.find(
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
    <Shelf>
      {top10.map((item, idx) => (
        <ShelfRow
          key={idx}
          label={
            <>
              {`${item.manager1Name} vs. ${item.manager2Name}`}{" "}
              <SubSubText className="sm:inline block">
                ({item.year} week {item.week}) <New year={item.year} />
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

export { LowestMatchupsShelf };
