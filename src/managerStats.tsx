import { StatCard } from "./statCard";
import { TrophyCount } from "./trophyCount";
import { useStore } from "./useData";

interface ManagerStatsProps {
  manager: string;
}

const ManagerStats = ({ manager }: ManagerStatsProps) => {
  const allData = useStore();
  const managerData = allData.teams?.find(
    (team) => team.managerName.toLowerCase() === manager.toLowerCase()
  );
  const years = allData.teamYears?.filter(
    (year) => year.teamEspnId === managerData?.espnId
  );
  const wins = years?.reduce((acc, year) => acc + year.wins, 0) || 0;
  const losses = years?.reduce((acc, year) => acc + year.losses, 0) || 0;

  const averageFinish = years
    ? (
        years.reduce((acc, year) => acc + year.finalRank, 0) / years.length
      ).toFixed(2)
    : 0;

  // playoff percentage is the percentage of years the playoff seed is 4 or less
  const playoffYears =
    years?.filter((year) => year.playoffSeed <= 4).length || 0;
  const playoffPercentage = years ? (playoffYears / years.length) * 100 : 0;

  return (
    <div>
      <h1>
        <span className="capitalize">{manager}</span>'s fantasy stats
        <TrophyCount numTrophies={managerData?.trophies} />
      </h1>

      {/* these classes copied from shadcn demo, I have no clue what they all mean */}
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <StatCard name="Win/Loss" value={`${wins}-${losses}`} />
            <StatCard name="Average points per game" value={"TODO"} />
            <StatCard
              name="Average finish"
              value={`${averageFinish}th place`}
            />
            <StatCard
              name="Playoff %"
              value={`${playoffPercentage.toFixed(0)}% (${playoffYears}/${
                years?.length
              })`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerStats;
