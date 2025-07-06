import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management3.vercel.app/api",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedBook }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery, useUpdateBookMutation } =
  bookApi;
