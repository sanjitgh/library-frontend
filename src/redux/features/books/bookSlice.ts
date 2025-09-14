import type { BType } from "@/types/bookType";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface BookState {
  books: BType[];
  currentPage: number;
  limit: number;
}

const initialState: BookState = {
  books: [],
  currentPage: 1,
  limit: 5,
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
});

export const { setCurrentPage } = BookSlice.actions;

export default BookSlice.reducer;
