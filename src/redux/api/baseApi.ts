import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "books",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["books"],
  endpoints: (build) => ({
    // Get All Book
    getBooks: build.query({
      query: () => "/books",
      transformResponse: (response) => response.data, // for using get data
      providesTags: ["books"], // valid cache
    }),

    // Create a book
    createBook: build.mutation({
      query: (bookData) => ({
        url: "/create-book",
        method: "POST",
        body: bookData,
      }),

      invalidatesTags: ["books"], // refetch after create book
    }),

    // Delete a book
    deleteBook: build.mutation({
      query: (bookId) => ({
        url: `delete-book/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"], // refetch after delete
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
} = baseApi; // Create the hook automatically from the redux
