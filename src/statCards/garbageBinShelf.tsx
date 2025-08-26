import { useStore } from "../data/useStore";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubText } from "@/reusableComponents/subText";

const GarbageBinShelf = () => {
  const data = useStore((s) => s.allData.teamStats).sort(
    (a, b) =>
      a.binYears.length - b.binYears.length ||
      b.binYears[b.binYears.length - 1] - a.binYears[a.binYears.length - 1]
  );

  return (
    <Shelf>
      {data.map((item) => (
        <ShelfRow key={item.team.espnId} label={item.team.managerName}>
          <span>&nbsp;{"🗑️".repeat(item.binYears.length)}</span>
          {item.binYears.length > 0 && (
            <SubText>{"(" + item.binYears.join(", ") + ")"}</SubText>
          )}
        </ShelfRow>
      ))}
    </Shelf>
  );
};

export { GarbageBinShelf };
