import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for handling the connections state
const connectionsSlice = createSlice({
  name: "connections", // Name of the slice
  initialState: null, // Initial state is null
  reducers: {
    // Reducer to add all connections to the state
    addConnections: (state, action) => action.payload,
  }
});

// Export the addConnections action for use in components
export const { addConnections } = connectionsSlice.actions;

// Export the reducer to be used in the Redux store
export default connectionsSlice.reducer;
