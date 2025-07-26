import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";

const BiggestWeeksShelf = () => {
  const allData = useStore();

  // Build a list of all team week scores, for both home and away teams
  const weekScores: {
    manager: string;
    score: number;
    year: number;
    week: number;
  }[] = [];

  const idToManager: Record<string, string> = {};
  allData.teams?.forEach((team) => {
    idToManager[team.espnId] = team.managerName;
  });

  allData.teamWeeks?.forEach((week) => {
    weekScores.push({
      manager: idToManager[week.homeTeamEspnId],
      score: week.homeTeamScore,
      year: week.year,
      week: week.week,
    });
    weekScores.push({
      manager: idToManager[week.awayTeamEspnId],
      score: week.awayTeamScore,
      year: week.year,
      week: week.week,
    });
  });

  // Sort by score descending and take top 10
  const top10 = weekScores.sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <Shelf title="Biggest Weeks">
      {top10.map((item, idx) => (
        <ShelfRow key={idx} label={item.manager}>
          {item.score}{" "}
          <span className="text-xs text-gray-500 ml-2">
            ({item.year} week {item.week})
          </span>
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { BiggestWeeksShelf };
