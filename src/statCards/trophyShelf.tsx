import { useStore } from "../useData";
import classes from "./trophyShelf.module.scss";
import { TrophyCount } from "../reusableComponents/trophyCount";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubText } from "@/reusableComponents/subText";

const TrophyShelf = () => {
  const allData = useStore();

  const champs = allData.teamStats.filter((team) => team.trophies > 0);

  const grouped: Record<number, typeof champs> = {};
  for (const team of champs) {
    if (!grouped[team.trophies]) {
      grouped[team.trophies] = [];
    }
    grouped[team.trophies].push(team);
  }
  const groupedEntries = Object.entries(grouped).sort(
    ([a], [b]) => Number(b) - Number(a)
  );

  return (
    <Shelf title="Trophy Shelf">
      {groupedEntries.map(([trophyCount, teams]) => (
        <ShelfRow key={trophyCount}>
          {teams.map((team) => (
            <span
              key={team.team.espnId}
              style={{ marginLeft: 12, marginRight: 12, marginTop: -5 }}
              className="whitespace-nowrap"
            >
              {team.team.managerName}{" "}
              <span className={classes.trophyCount}>
                <TrophyCount numTrophies={team.trophies} />
              </span>
              {team.trophyYears && team.trophyYears.length > 0 && (
                <SubText>({team.trophyYears.join(", ")})</SubText>
              )}
            </span>
          ))}
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { TrophyShelf };
