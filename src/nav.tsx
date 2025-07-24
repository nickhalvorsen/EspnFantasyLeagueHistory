import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./components/ui/navigation-menu";
import { Link } from "wouter";
import { ManagerSelector } from "./managerSelector";

interface NavProps {
  leagueName: string;
}

const Nav = ({ leagueName }: NavProps) => {
  return (
    <div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {/* <NavigationMenuItem>{leagueName} Fantasy Stats</NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
        <ManagerSelector />
      </NavigationMenu>
    </div>
  );
};

export { Nav };
