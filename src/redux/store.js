// import { configureStore } from '@reduxjs/toolkit';
// import { contactsSlice } from './contacts/contactsSlice';
// import logger from 'redux-logger';

// export const store = configureStore({
//   reducer: {
//     contacts: contactsSlice.reducer,
//   },
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
// });

import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { contactsApi } from './contacts/contacts';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
