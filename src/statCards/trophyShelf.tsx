import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubText } from "@/reusableComponents/subText";

const TrophyShelf = () => {
  const data = useStore((s) => s.allData.teamStats)
    .sort(
      (a, b) =>
        b.trophyYears.length - a.trophyYears.length ||
        a.trophyYears[a.trophyYears.length - 1] -
          b.trophyYears[b.trophyYears.length - 1]
    )
    .filter((team) => team.trophyYears.length > 0);

  return (
    <Shelf>
      {data.map((item) => (
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
