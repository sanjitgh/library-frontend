import type { BType } from "@/types/bookType";
import { createSlice } from "@reduxjs/toolkit";

export interface BookState {
  books: BType[];
}

const initialState: BookState = {
  books: [
    {
      id: "idsdfasd",
      title: "Title",
      author: "author",
      genre: "genre",
      isbn: "isbn",
      description: "description",
      copies: 5,
      available: true,
    },
  ],
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});

export const {} = BookSlice.actions;

export default BookSlice.reducer;
