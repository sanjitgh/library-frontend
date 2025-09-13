import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div className="bg-gray-200 py-3">
      <div className="max-w-5xl mx-auto px-3 flex justify-between items-center">
        <div className="text-2xl font-semibold">Logo</div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center gap-5 font-semibold">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/add-book"}>Add Books</NavLink>
              <NavLink to={"/all-book"}>All Books</NavLink>
              <NavLink to={"/borrow-summary"}>Borrow Summary</NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
