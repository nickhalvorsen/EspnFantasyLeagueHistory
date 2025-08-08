import { useStore } from "../useData";
import { Shelf, ShelfRow } from "../reusableComponents/shelf";
import { SubText } from "@/reusableComponents/subText";

const GarbageBinShelf = () => {
  const allData = useStore((s) => s.teamStats).sort(
    (a, b) => a.binYears.length - b.binYears.length
  );

  return (
    <Shelf>
      {allData.map((item) => (
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
