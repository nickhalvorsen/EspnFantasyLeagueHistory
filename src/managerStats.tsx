import { StatCard } from "./statCard";

interface ManagerStatsProps {
  manager: string;
}

const ManagerStats = ({ manager }: ManagerStatsProps) => {
  return (
    <div>
      <h1>
        <span className="capitalize">{manager}</span>'s fantasy stats 🏆🏆
      </h1>

      {/* these classes copied from shadcn demo, I have no clue what they all mean */}
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <StatCard name="Win/Loss" value="75-66" />
            <StatCard name="Average points" value={131.9} />
            <StatCard name="Average finish" value={"4.2th place"} />
            <StatCard name="Playoff %" value={"43%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerStats;
