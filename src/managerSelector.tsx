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
  const teams = useStore((state) => state.teams).sort((a, b) =>
    a.managerName.localeCompare(b.managerName)
  );
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Manager stats</NavigationMenuTrigger>
      <NavigationMenuContent className="absolute">
        <ul className="grid w-[200px] gap-4">
          <li>
            {teams.map((team) => (
              <NavigationMenuLink asChild key={team.id}>
                <Link href={`/managers/${team.managerName}`}>
                  {team.managerName}
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
