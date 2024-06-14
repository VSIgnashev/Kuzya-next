import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackbarsStates = {
  errorMessage: string | null;
  successMessage: string | null;
};

const initialState: SnackbarsStates = {
  errorMessage: null,
  successMessage: null,
};

const snackbarSlice = createSlice({
  name: "Snackbars",
  initialState,
  reducers: {
    createError(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    resetError(state) {
      state.errorMessage = null;
    },
    createSuccessMessage(state, action: PayloadAction<string>) {
      state.successMessage = action.payload;
    },
    resetSuccessMessage(state) {
      state.successMessage = null;
    },
  },
});

export const {
  createError,
  resetError,
  createSuccessMessage,
  resetSuccessMessage,
} = snackbarSlice.actions;

export default snackbarSlice.reducer;
