import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { closeMenu, toggleMenu } from "@/redux/features/navbar/navbarSlice";
import type { RootState } from "@/redux/store";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";

export default function Navbar() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.nav.isMenuOpen);

  return (
    <div className="bg-gray-200 py-3">
      <div className="max-w-5xl mx-auto px-3 flex justify-between items-center">
        <div className="text-2xl font-semibold">Logo</div>
        <div>
          <button className="md:hidden" onClick={() => dispatch(toggleMenu())}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList>
              <NavigationMenuItem className="flex items-center gap-5 font-semibold">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/add-book"}>Add Books</NavLink>
                <NavLink to={"/all-book"}>All Books</NavLink>
                <NavLink to={"/borrow-summary"}>Borrow Summary</NavLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Dropdown menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-14 left-0 w-full bg-gray-300 flex flex-col items-center py-4 space-y-3 font-semibold">
              <NavLink to={"/"} onClick={() => dispatch(closeMenu())}>
                Home
              </NavLink>
              <NavLink to={"/add-book"} onClick={() => dispatch(closeMenu())}>
                Add Books
              </NavLink>
              <NavLink to={"/all-book"} onClick={() => dispatch(closeMenu())}>
                All Books
              </NavLink>
              <NavLink
                to={"/borrow-summary"}
                onClick={() => dispatch(closeMenu())}
              >
                Borrow Summary
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
