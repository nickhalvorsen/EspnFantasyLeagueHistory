import { Link } from "wouter";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./components/ui/navigation-menu";

const ManagerSelector = () => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>Manager stats</NavigationMenuTrigger>
    <NavigationMenuContent>
      <ul className="grid w-[200px] gap-4">
        <li>
          <NavigationMenuLink asChild>
            <Link href="/managers/alex">Alex</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/brandon">Brandon</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/connor">Connor</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/cole">Cole</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/g-pop">G-Pop</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/leah">Leah</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/nick">Nick</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/paul">Paul</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/sean">Sean</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link href="/managers/sean">Trace</Link>
          </NavigationMenuLink>
        </li>
      </ul>
    </NavigationMenuContent>
  </NavigationMenuItem>
);

export { ManagerSelector };
