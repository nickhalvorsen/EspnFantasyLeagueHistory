import { Link } from "wouter";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu";
import { useStore } from "./useData";
import { TrophyCount } from "./reusableComponents/trophyCount";

const ManagerSelector = () => {
  const teams = useStore((state) => state.teamStats).sort((a, b) =>
    a.team.managerName.localeCompare(b.team.managerName)
  );
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Manager stats</NavigationMenuTrigger>
      <NavigationMenuContent className="absolute">
        <ul className="grid w-[200px] gap-4">
          <li>
            {teams.map((team) => (
              <NavigationMenuLink asChild key={team.team.espnId}>
                <Link href={`/managers/${team.team.managerName}`}>
                  {team.team.managerName}
                  <TrophyCount numTrophies={team.trophies} />
                </Link>
              </NavigationMenuLink>
            ))}
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export { ManagerSelector };
