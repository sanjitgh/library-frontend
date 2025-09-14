import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SERVER_URL }),
  tagTypes: ["books", "borrows"],
  endpoints: (build) => ({
    // Get All Book
    getBooks: build.query({
      query: ({ page = 1, limit = 5 }) => `books?page=${page}&limit=${limit}`,
      transformResponse: (response) => response.data,
      providesTags: ["books"],
    }),

    // Get single Book
    getSingleBook: build.query({
      query: (bookId) => `/books/${bookId}`,
      transformResponse: (response) => response.data, // for using get without data.data
      providesTags: ["books"], // valid cache
    }),

    // Update book
    updateBook: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/edit-book/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["books"], // refetch after create book
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

    // Create a borrow
    borrowBook: build.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),

      invalidatesTags: ["books", "borrows"], // refetch both
    }),

    // get a borrow
    borrowSummary: build.query({
      query: () => "/borrow-summary",
      transformResponse: (response) => response.data,
      providesTags: ["borrows"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useBorrowSummaryQuery,
  useGetSingleBookQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useUpdateBookMutation,
} = baseApi; // Create the hook automatically from the redux
