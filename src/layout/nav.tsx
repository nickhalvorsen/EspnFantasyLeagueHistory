import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
import { Link } from "wouter";
import { ManagerSelector } from "../managerSelector";

const Nav = () => {
  return (
    <div>
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">League stats</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <ManagerSelector />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export { Nav };
