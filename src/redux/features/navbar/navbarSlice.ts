import { createSlice } from "@reduxjs/toolkit";

interface NavbarSlice {
  isMenuOpen: boolean;
}

const initialState: NavbarSlice = {
  isMenuOpen: false,
};

const navbarSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
  },
});

export const { toggleMenu, closeMenu } = navbarSlice.actions;

export default navbarSlice.reducer;
