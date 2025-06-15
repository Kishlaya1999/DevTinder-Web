import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for handling requests state
const requestSlice = createSlice({
  name: "requests", // Name of the slice
  initialState: null, // Initial state is null
  reducers: {
    // Reducer to add all requests to the state
    addRequests: (state, action) => action.payload,
    // Reducer to remove a request by its _id
    removeRequest: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  }
});

// Export actions for use in components
export const { addRequests, removeRequest } = requestSlice.actions;

// Export reducer to be used in the Redux store
export default requestSlice.reducer;