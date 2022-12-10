// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6391cf11ac688bbe4c533d42.mockapi.io',
  }),
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/phonebook`,
    }),

    // getContacts: builder.query({
    //   query: () => `/phonebook`,
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetContactsQuery } = contactsApi;
