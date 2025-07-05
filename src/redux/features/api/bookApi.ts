import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management3.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApi;
