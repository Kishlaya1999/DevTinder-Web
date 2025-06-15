import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for handling the feed state
export const feedSlice = createSlice({
  name: 'feed', // Name of the slice
  initialState: null, // Initial state is null
  reducers: {
    // Reducer to add the feed data to the state
    addFeed: (state, action) => action.payload,
    // Reducer to remove a user from the feed by their _id
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  }
});

// Export actions for use in components
export const { addFeed, removeUserFromFeed } = feedSlice.actions;

// Export reducer to be used in the Redux store
export default feedSlice.reducer;