import { createSlice, createAction } from '@reduxjs/toolkit';

function isRejectedAction(action) {
  return action.type.endsWith('rejected');
}

export const findContact = createAction('findContact');

const initialState = {
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: build => {
    build
      .addCase(findContact, (state, action) => {
        state.filter = action.payload;
      })
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => {}
      )
      .addDefaultCase((state, action) => {});
  },
});

export const contactsReducer = contactsSlice.reducer;
