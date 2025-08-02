import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../components/ui/navigation-menu";
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
              <Link to="/">League stats</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <ManagerSelector />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export { Nav };
