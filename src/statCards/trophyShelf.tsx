import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubText } from "@/reusableComponents/subText";

const TrophyShelf = () => {
  const allData = useStore((s) => s.teamStats)
    .sort((a, b) => b.trophyYears.length - a.trophyYears.length)
    .filter((team) => team.trophyYears.length > 0);

  return (
    <Shelf>
      {allData.map((item) => (
        <ShelfRow key={item.team.espnId} label={item.team.managerName}>
          <span className="text-[1.5em]">
            &nbsp;{"🏆".repeat(item.trophyYears.length)}
          </span>
          {item.trophyYears.length > 0 && (
            <SubText>{"(" + item.trophyYears.join(", ") + ")"}</SubText>
          )}
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { TrophyShelf };
