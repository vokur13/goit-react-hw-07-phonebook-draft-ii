import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contacts/contactsSlice';
// import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import logger from 'redux-logger';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';

// const persistConfig = {
//   key: 'root',
//   storage,
//   stateReconciler: autoMergeLevel1,
//   // stateReconciler: hardSet,
//   whitelist: ['contacts'],
// };

// const persistedReducer = persistReducer(persistConfig, contactsSlice.reducer);

// export const store = configureStore({
//   reducer: {
//     contacts: persistedReducer,
//   },
//   middleware: [thunk],
// });

// export const persistor = persistStore(store);

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
