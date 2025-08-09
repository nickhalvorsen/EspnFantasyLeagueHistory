import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubSubText } from "@/reusableComponents/subSubText";
import New from "@/reusableComponents/new";

const ClosestMatchesShelf = () => {
  const allData = useStore();
  const closestMatches = allData.teamStats
    .flatMap((teamStats) =>
      teamStats.closestGames.map((match) => ({
        ...match,
        manager1Name: allData.teams.find(
          (team) => team.espnId === match.manager1
        )?.managerName,
        manager2Name: allData.teams.find(
          (team) => team.espnId === match.manager2
        )?.managerName,
        differential: match.manager1score - match.manager2score,
      }))
    )
    .sort((a, b) => Math.abs(a.differential) - Math.abs(b.differential))
    .filter((match) => match.differential >= 0);

  const top10 = closestMatches.slice(0, 10);

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
          {item.manager1score}–{item.manager2score}
          <SubSubText className="sm:inline block">
            ({item.differential.toFixed(2)} pts margin)
          </SubSubText>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { ClosestMatchesShelf };
