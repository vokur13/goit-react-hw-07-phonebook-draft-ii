// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6391cf11ac688bbe4c533d42.mockapi.io',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/phonebook`,
    }),
    providesTags: ['Contact'],
    addContact: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ lastName, firstName, phone }) => ({
        url: '/phonebook',
        method: 'POST',
        body: { lastName, firstName, phone },
      }),
      invalidatesTags: ['Contact'],
    }),

    deleteContact: builder.mutation({
      // note: an optional `queryFn` may be used in place of `query`
      query: itemId => ({
        url: `/phonebook/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    // deleteContact: builder.mutation({
    //   query(itemId) {
    //     return {
    //       url: `/phonebook/${itemId}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: ['Contact'],
    // }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
